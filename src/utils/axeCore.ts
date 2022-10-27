import type React from 'react';

// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout;
let running = false;

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

        if (running) {
            clearTimeout(timer);

            timer = setTimeout(async () => {
                running = true;
                // eslint-disable-next-line @nfq/no-magic-numbers
                await axe.default(App, ReactDOM, 1000, config);
                running = false;
            }, 1000);
        } else {
            running = true;
            // eslint-disable-next-line @nfq/no-magic-numbers
            await axe.default(App, ReactDOM, 1000, config);
            running = false;
        }
    }
};