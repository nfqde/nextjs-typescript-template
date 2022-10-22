import {COVERAGE} from '@app/features';

import nextConnect from 'Server/nextConnect';

import {Status} from 'Server/utils/httpCodes';
import {connectable, HTTP_METHODS, TypedRoute} from 'Server/utils/typedRoute';

/**
 * Coverage endpoint.
 *
 * @param req Request.
 * @param res Response.
 */
const getCoverage = TypedRoute(HTTP_METHODS.GET, async () => {
    if (COVERAGE) {
        return Promise.resolve({
            // eslint-disable-next-line no-underscore-dangle
            coverage: global.__coverage__ ?? null,
            status: Status.OK
        });
    }

    return Promise.resolve({status: Status.NOT_FOUND});
});

export default nextConnect()
    .get(connectable(getCoverage));