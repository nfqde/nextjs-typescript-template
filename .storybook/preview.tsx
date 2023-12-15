import React from 'react';
import {ScreenSizeProvider} from '@nfq/react-grid';
import {LazyMotion} from 'framer-motion';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle, theme} from '../src/client/ui/utils/globalStyles';

import type {Preview} from "@storybook/react";
import type {FeatureBundle} from "framer-motion";

import '../src/client/ui/assets/fonts/fonts.css';

/**
 * Loads the framer-motion features.
 *
 * @returns The framer-motion feature bundle.
 */
const loadMotionFeatures = async (): Promise<FeatureBundle> => {
    const module = await import(
        /* webpackChunkName: "motionFeatures" */
        '../src/client/ui/utils/motionFeatures'
    );

    return module.default;
};

const preview: Preview = {
    argTypes: {
        ref: {table: {disable: true}},
        theme: {table: {disable: true}},
        as: {table: {disable: true}},
        forwardedAs: {table: {disable: true}}
    },
    decorators: [
        (Story) => (
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <ScreenSizeProvider>
                    <LazyMotion features={loadMotionFeatures} strict>
                        <Story />
                    </LazyMotion>
                </ScreenSizeProvider>
            </ThemeProvider>
        )
    ],
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        backgrounds: {
            default: 'Light',
            values: [
                {
                    name: 'Dark',
                    value: '#000066',
                },
                {
                    name: 'Light',
                    value: '#F3F5F6',
                },
                {
                    name: 'White',
                    value: '#FFFFFF',
                }
            ]
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
            sort: 'requiredFirst'
        }
    }
};

export default preview;
