/* eslint-disable no-console */
import {INTERNAL_ERROR} from './httpCodes';

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

    res.status(INTERNAL_ERROR).json({
        message,
        statusCode: INTERNAL_ERROR
    });
};