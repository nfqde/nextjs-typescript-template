/* eslint-disable @nfq/no-magic-numbers */
import useSwr from 'swr';
import useSWRMutation from 'swr/mutation';

import type {HTTP_METHODS} from '../../server/utils/typedRoute';
import type {BareFetcher, Key, SWRConfiguration} from 'swr';
import type {SWRMutationConfiguration} from 'swr/mutation';

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
export type ApiMethod = (req: never, res: never, method: never, body: never, query: never) => unknown;
export type ApiResponse<T extends ApiMethod> =
    UnwrapPromise<ReturnType<T>>;
export type ApiRequestBody<T extends ApiMethod> = Parameters<T>[3];
export type ApiRequestMethod<T extends ApiMethod> = Parameters<T>[2];

interface RequestOptions<T extends ApiMethod> {
    body?: ApiRequestBody<T>;
    headers?: Record<string, string>;
    method?: ApiRequestMethod<T>;
}

type MutationRequestOptions<T extends ApiMethod> = {
    asFormData?: boolean;
    headers?: Record<string, string>;
} & (ApiRequestBody<T> extends undefined ? Omit<{body: never}, 'body'> : {body: ApiRequestBody<T>})
& (ApiRequestMethod<T> extends HTTP_METHODS.GET ? Omit<{method: never}, 'method'> : {method: ApiRequestMethod<T>});

export interface RequestError<T extends ApiMethod> extends Error {
    info: ApiResponse<T>['message'];
    status: ApiResponse<T>['status'];
}

/**
 * The fetcher method for all swr hooks.
 *
 * @param url           The url to fetch.
 * @param props         The request options.
 * @param props.body    The request body.
 * @param props.headers The request headers.
 * @param props.method  The request method.
 */
const fetcher = async <T extends ApiMethod>(
    url: string,
    {
        body,
        headers = {},
        method
    }: RequestOptions<T> = {}
): Promise<ApiResponse<T>['data']> => {
    const response = await fetch(url, {
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        method: method || body ? 'POST' : 'GET'
    });

    const data = await response.json() as ApiResponse<T>;

    if (data.status > 400) {
        const error = new Error('Something went wrong') as RequestError<T>;

        error.info = data.message;
        error.status = data.status;

        throw error;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data.data;
};

/**
 * The fetcher method for all swr hooks.
 *
 * @param url               The url to fetch.
 * @param props             The request options.
 * @param props.arg         The 0th argument passed to the trigger.
 * @param props.arg.body    The request body.
 * @param props.arg.headers The request headers.
 * @param props.arg.method  The request method.
 */
const mutationFetcher = async <T extends ApiMethod>(
    url: string,
    {arg}: {arg: MutationRequestOptions<T>}
): Promise<ApiResponse<T>['data']> => {
    let body: FormData | string | undefined;
    let method = 'GET';
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...arg.headers
    };

    if ('body' in arg) {
        if (arg.asFormData) {
            body = new FormData();

            for (const key in arg.body as any) {
                if (typeof arg.body[String(key)] !== 'undefined') {
                    if ((arg.body[String(key)] as FileList)[0] instanceof File) {
                        const files = Array.from(arg.body[String(key)] as FileList);

                        // eslint-disable-next-line @typescript-eslint/no-loop-func
                        files.forEach(file => (body as FormData).append(key, file));
                    } else {
                        body.append(key, arg.body[String(key)]);
                    }
                }
            }
        } else {
            body = JSON.stringify(arg.body);
        }
    }

    if (arg.asFormData) {
        delete headers['Content-Type'];
    }

    if ('method' in arg) {
        method = arg.method;
    }

    const response = await fetch(url, {
        body,
        headers,
        method
    });

    const data = await response.json() as ApiResponse<T>;

    if (data.status > 400) {
        const error = new Error('Something went wrong') as RequestError<T>;

        error.info = data.message;
        error.status = data.status;

        throw error;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data.data;
};

/**
 * Non hook version of api.
 *
 * @param url           API URL.
 * @param props         Request options.
 * @param props.method  Request method.
 * @param props.headers Request headers.
 * @param props.body    Request body.
 */
export const api = async <T extends ApiMethod>(
    url: string,
    {
        body,
        headers = {},
        method
    }: RequestOptions<T> = {}
): Promise<ApiResponse<T>['data']> => fetcher<T>(url, {
    body,
    headers,
    method
});

/**
 * Get request hook.
 *
 * @param url        API URL.
 * @param swrOptions SWR options.
 * @returns SWR response.
 */
export const useApi = <T extends ApiMethod>(
    url: string,
    swrOptions?: SWRConfiguration<ApiResponse<T>['data'] | null, any, BareFetcher<ApiResponse<T>['data'] | null>>
) => {
    const {data, error, isValidating, mutate}
        = useSwr<ApiResponse<T>['data'] | null, RequestError<T>>(url, fetcher, swrOptions);

    return {
        data,
        error,
        isValidating,
        mutate
    };
};

/**
 * Get request hook.
 *
 * @param url        API URL.
 * @param swrOptions SWR options.
 * @returns SWR response.
 */
export const useMutateApi = <T extends ApiMethod>(
    url: string,
    swrOptions?: SWRMutationConfiguration<ApiResponse<T>['data'] | null, any> | undefined
) => {
    const {
        data,
        error,
        isMutating,
        reset,
        trigger
    } = useSWRMutation<ApiResponse<T>['data'] | null, RequestError<T>, Key, MutationRequestOptions<T>>(
        url,
        mutationFetcher,
        swrOptions
    );

    return {
        data,
        error,
        isMutating,
        reset,
        trigger
    };
};