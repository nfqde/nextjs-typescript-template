/* eslint-disable @typescript-eslint/no-unsafe-return */
import type {Status} from './httpCodes';
import type {NextApiRequest, NextApiResponse} from 'next';

export enum HTTP_METHODS {
    DELETE = 'DELETE',
    GET = 'GET',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT'
}

export type TypedRouteType = <
    METHOD extends HTTP_METHODS,
    R extends {status: Status},
    BODY = undefined,
    QUERY = undefined
>(
    method: METHOD,
    handler: (
        req: NextApiRequest,
        res: NextApiResponse,
        body: BODY,
        query: QUERY
    ) => Promise<R>
) => (
    req: NextApiRequest,
    res: NextApiResponse,
    method: METHOD,
    body: BODY,
    query: QUERY
) => Promise<R>;

/**
 * Type Throught routes.
 *
 * @param method  The https that must be used.
 * @param handler The route handler.
 * @returns The typed route.
 */
export const TypedRoute: TypedRouteType = (method, handler) => (
    async (req: NextApiRequest, res: NextApiResponse) => {
        const response = await handler(req, res, req.body as never, req.query as never);

        res.status(response.status).send(response);
    }) as any;

/**
 * Makes an TypedRoute compatible with next-connect.
 *
 * @param handler The typed route.
 * @returns The next-connect compatible route.
 */
export const connectable
    = (handler: unknown) => handler as (req: NextApiRequest, res: NextApiResponse) => Promise<void>;