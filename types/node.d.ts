/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable max-classes-per-file */
/// <reference types="node" resolution-mode="require"/>
import type {IncomingMessage, ServerResponse} from 'http';
import type {
    FindResult,
    FunctionLike,
    HandlerOptions,
    HttpMethod,
    Nextable,
    RouteMatch,
    ValueOrPromise
} from 'next-connect';

export declare type Route<H> = {
    fns: (H | Router<H extends FunctionLike ? H : never>)[];
    isMiddle: boolean;
    method: HttpMethod | '';
    prefix?: string;
} & ({
    keys: string[] | false;
    pattern: RegExp;
} | {
    matchAll: true;
});

declare type RouteShortcutMethod<This, H extends FunctionLike> = (
    route: Nextable<H> | RouteMatch,
    ...fns: Nextable<H>[]
) => This;

/**
 *
 */
export declare class Router<H extends FunctionLike> {
    base: string;

    routes: Route<Nextable<H>>[];

    /**
     *
     */
    constructor(base?: string, routes?: Route<Nextable<H>>[]);
    /**
     *
     */
    add(method: HttpMethod | '', route: Nextable<H> | RouteMatch, ...fns: Nextable<H>[]): this;
    all: RouteShortcutMethod<this, H>;

    get: RouteShortcutMethod<this, H>;

    head: RouteShortcutMethod<this, H>;

    post: RouteShortcutMethod<this, H>;

    put: RouteShortcutMethod<this, H>;

    patch: RouteShortcutMethod<this, H>;

    delete: RouteShortcutMethod<this, H>;
    /**
     *
     */
    use(base: Nextable<H> | RouteMatch | Router<H>, ...fns: (Nextable<H> | Router<H>)[]): this;
    /**
     *
     */
    clone(base?: string): Router<H>;
    /**
     *
     */
    static exec<H extends FunctionLike>(fns: Nextable<H>[], ...args: Parameters<H>): Promise<unknown>;
    /**
     *
     */
    find(method: HttpMethod, pathname: string): FindResult<H>;
}


export declare type RequestHandler<Req extends IncomingMessage, Res extends ServerResponse> = (
    req: Req,
    res: Res
) => ValueOrPromise<void>;

/**
 *
 */
// eslint-disable-next-line max-len
export declare class NodeRouter<Req extends IncomingMessage = IncomingMessage, Res extends ServerResponse = ServerResponse> extends Router<RequestHandler<Req, Res>> {
    /**
     *
     */
    constructor();
    private readonly prepareRequest;
    /**
     *
     */
    run(req: Req, res: Res): Promise<unknown>;
    /**
     *
     */
    handler(options?: HandlerOptions<RequestHandler<Req, Res>>): (req: Req, res: Res) => Promise<void>;
}

export declare function getPathname(url: string): string;
export declare function createRouter<Req extends IncomingMessage, Res extends ServerResponse>(): NodeRouter<Req, Res>;