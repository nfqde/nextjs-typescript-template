import {createRouter} from 'next-connect';

import {demoMiddleware} from 'Server/middleware/demoMiddleware';

import type {NextApiRequest, NextApiResponse} from 'next';

/**
 * NextConnect with middleware to automatically connect to mongodb.
 *
 * @returns NextConnect with middleware.
 */
const nextConnect = () => {
    const router = createRouter<NextApiRequest, NextApiResponse>();

    return router.use(demoMiddleware);
};

export default nextConnect;