import {createRouter} from 'next-connect';

import type {NextApiRequest, NextApiResponse} from 'next';
import type {NodeRouter} from 'types/node';

type NextRouter = NodeRouter<NextApiRequest, NextApiResponse>;

/**
 * NextConnect with middleware to automatically connect to mongodb.
 *
 * @returns NextConnect with middleware.
 */
const nextConnect = (): NextRouter => {
    const router = createRouter<NextApiRequest, NextApiResponse>();

    return (router as unknown as NextRouter);
};

export default nextConnect;