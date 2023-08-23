/// <reference types="node" />
// eslint-disable-next-line no-underscore-dangle, no-var
declare var __coverage__: boolean | string | null | undefined;
declare namespace NodeJS {
    interface ProcessEnv {
        BASE_URL: string;
        FEATURE_ENV: string;
    }
}