import type {NextApiRequest, NextApiResponse} from 'next';
import type {NextHandler} from 'next-connect';

/**
 * The `authMiddleware` function is an asynchronous middleware function used for authentication purposes in an API.
 * It checks if the incoming request is for authentication, if so, it simply passes the request to the next middleware.
 * If not, it retrieves the 'user' cookie from the request. If the cookie does not exist, it sends an 'Unauthorized' response.
 * If the cookie exists, it verifies the JWT token contained in the cookie. If the verification fails, it sends an 'Unauthorized' response.
 * If the verification is successful, it attaches the user and the 'frontifyApiKey' from the JWT payload to the request object and passes the request to the next middleware.
 *
 * @param req  The incoming request, an instance of `AuthenticatedApiRequest`.
 * @param res  The outgoing response, an instance of `NextApiResponse`.
 * @param next The next middleware function in the pipeline, an instance of `NextHandler`.
 * @returns     Void as it's a middleware function.
 *
 * @example
 * ```tsx
 * server.use(authMiddleware);
 * ```
 */
export const demoMiddleware = async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
) => {
    await next();
};