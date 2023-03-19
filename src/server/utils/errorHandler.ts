/* eslint-disable no-console */
import {HTTP_STATUS} from '@nfq/typed-next-api';

import type {NextApiRequest, NextApiResponse} from 'next';

/**
 * Handle errors in apis.
 *
 * @param err Error object.
 * @param req Request.
 * @param res Response.
 */
export const errorHandler = (err: unknown, req: NextApiRequest, res: NextApiResponse): void => {
    console.log(err);

    const {message = 'Unknown error'} = err as Error;

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message,
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR
    });
};