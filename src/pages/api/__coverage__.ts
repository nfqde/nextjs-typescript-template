import {COVERAGE} from '@app/features';

import nextConnect from 'Server/nextConnect';

import {NOT_FOUND, OK} from 'Server/utils/httpCodes';

import type {NextApiRequest, NextApiResponse} from 'next';

export default nextConnect()
    .get(
        /**
         * Coverage endpoint.
         *
         * @param req Request.
         * @param res Response.
         */
        (req: NextApiRequest, res: NextApiResponse): void => {
            if (COVERAGE) {
                // eslint-disable-next-line no-underscore-dangle
                res.status(OK).json({coverage: global.__coverage__ ?? null});
            } else {
                res.status(NOT_FOUND);
            }
        }
    );