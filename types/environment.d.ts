/// <reference types="node" />
// eslint-disable-next-line no-underscore-dangle, no-var
declare var __coverage__: boolean | string | null | undefined;
declare namespace NodeJS {
    interface ProcessEnv {
        BASE_URL: string;
        FRONTIFY_API_KEY: string;
        JWT_SECRET: string;
        MONGODB_URI: string;
        NEXT_PUBLIC_FRONTIFY_CLIENT_ID: string;
        NEXT_PUBLIC_FRONTIFY_DOMAIN: string;
    }
}