import type React from 'react';

/**
 * Gets Accessibility.
 *
 * @param App    The app to test.
 * @param config The axe config.
 */
export const reportAccessibility = async (App: typeof React, config?: Record<string, unknown>): Promise<void> => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
        const axe = await import(
            /* webpackChunkName: "axe-core" */
            '@axe-core/react'
        );
        const ReactDOM = await import(
            /* webpackChunkName: "react-dom" */
            'react-dom'
        );

        // eslint-disable-next-line @nfq/no-magic-numbers
        await axe.default(App, ReactDOM, 1000, config);
    }
};