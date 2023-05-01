import {configureFonts, getFontThemeList} from '@nfq/next-fonts';
import {createGlobalStyle} from 'styled-components';

import type {Config} from '@nfq/react-grid';
import type {DefaultTheme} from 'styled-components';

export const fontDefinitions = configureFonts({
    Lato: [
        {
            fontDisplay: 'swap',
            fontStyle: 'normal',
            fontWeight: 'bold',
            preload: true,
            src: '/fonts/lato-bold.woff2'
        },
        {
            fontDisplay: 'swap',
            fontStyle: 'normal',
            fontWeight: 'normal',
            preload: true,
            src: '/fonts/lato-regular.woff2'
        }
    ]
});

const nfqgrid: Config = {
    baseSpacing: 0.5,
    container: {
        lg: 960,
        md: 740,
        sm: 540,
        xl: 1140,
        xs: 'fluid',
        xxl: 1140
    }
};

export const colors = {
    /** Page background color. ![#FFFFFF](https://via.placeholder.com/12/FFFFFF/FFFFFF.png) `#FFFFFF`. */
    pageBackground: '#FFFFFF'
};

export const theme: DefaultTheme = {
    colors,
    fonts: getFontThemeList(fontDefinitions),
    nfqgrid
};

export const GlobalStyle = createGlobalStyle`
    *,
    &::before,
    &::after {
        box-sizing: border-box;
    }

    * {
        -webkit-tap-highlight-color: transparent;
    }

    html {
        font-size: 10px;
    }

    html, body {
        background-color: ${({theme: globalTheme}) => globalTheme.colors.pageBackground};
        height: 100%;
        margin: 0;
        min-height: 100%;
        overflow: hidden;
        padding: 0;
        scroll-behavior: smooth;
    }

    #__next {
        background-color: ${({theme: globalTheme}) => globalTheme.colors.pageBackground};
        height: 100%;
        min-height: 100%;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
`;