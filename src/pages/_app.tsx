/* eslint-disable react/jsx-filename-extension */
import type {ReactNode} from 'react';
import React, {Component} from 'react';

import {preloadFonts} from '@nfq/next-fonts';
import {ScreenSizeProvider} from '@nfq/react-grid';
import {AnimatePresence, LazyMotion, m as motion} from 'framer-motion';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styled, {ThemeProvider} from 'styled-components';

import {fontDefinitions, GlobalStyle, theme} from 'UI/utils/globalStyles';

import type {FeatureBundle} from 'framer-motion';
import type {AppProps} from 'types/global';

import 'Fonts/fonts';

const AxeCoreHelper = dynamic(async () => import(
    /* webpackChunkName: "axeCoreHelper" */
    'UI/utils/AxeCoreHelper'
), {ssr: false});

/**
 * Loads the framer-motion features.
 *
 * @returns The framer-motion feature bundle.
 */
const loadMotionFeatures = async (): Promise<FeatureBundle> => {
    const module = await import(
        /* webpackChunkName: "motionFeatures" */
        'UI/utils/motionFeatures'
    );

    return module.default;
};

const layoutVariants = {
    enter: {opacity: 1},
    exit: {opacity: 0},
    initial: {opacity: 0}
};

/**
 * App component.
 */
class App extends Component<AppProps<object>> {
    /**
     * Gets the layout key for inter layout transitions.
     *
     * @memberof App
     * @returns The Layout component.
     */
    getLayoutKey(): string {
        const {Component: PageComponent} = this.props;

        return PageComponent.getLayoutKey?.() ?? 'default';
    }

    /**
     * Uses the right layout for the right page.
     *
     * @memberof App
     * @returns The Layout component.
     */
    chooseLayout(): ReactNode {
        const {Component: PageComponent, pageProps, router} = this.props;

        if (PageComponent.getLayout) {
            return PageComponent.getLayout(router, pageProps, PageComponent);
        }

        // eslint-disable-next-line react/jsx-props-no-spreading
        return <PageComponent {...pageProps} />;
    }

    /**
     * Renders the component.
     *
     * @memberof App
     * @returns React Component.
     */
    render(): ReactNode {
        return (
            <ThemeProvider theme={theme}>
                <Head>
                    <meta content="initial-scale=1.0, width=device-width" name="viewport" />
                    <link href="/favicon.ico" rel="icon" type="image/x-icon" />
                    {preloadFonts(fontDefinitions)}
                </Head>
                <GlobalStyle />
                <AxeCoreHelper />
                <ScreenSizeProvider>
                    <LazyMotion features={loadMotionFeatures} strict>
                        <AnimatePresence initial={false} mode="wait">
                            <AnimationWrapper
                                key={this.getLayoutKey()}
                                animate="enter"
                                exit="exit"
                                initial="initial"
                                variants={layoutVariants}
                            >
                                {this.chooseLayout()}
                            </AnimationWrapper>
                        </AnimatePresence>
                    </LazyMotion>
                </ScreenSizeProvider>
            </ThemeProvider>
        );
    }
}

export default App;

const AnimationWrapper = styled(motion.div)`
    height: 100%;
    width: 100%;
`;