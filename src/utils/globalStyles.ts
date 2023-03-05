import {configureFonts, getFontThemeList} from '@nfq/next-fonts';
import {createGlobalStyle} from 'styled-components';

import type {IConfig} from '@nfq/react-grid';
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

const nfqgrid: IConfig = {
    baseSpacing: 0.5,
    breakpoints: {
        lg: 992,
        md: 769,
        sm: 576,
        xl: 1200,
        xs: 0,
        xxl: 1600
    },
    columns: {
        lg: 12,
        md: 12,
        sm: 12,
        xl: 12,
        xs: 12,
        xxl: 12
    },
    container: {
        lg: 960,
        md: 740,
        sm: 540,
        xl: 1140,
        xs: 'fluid',
        xxl: 1140
    },
    gutterWidth: {
        lg: 20,
        md: 20,
        sm: 20,
        xl: 20,
        xs: 20,
        xxl: 20
    },
    paddingWidth: {
        lg: 10,
        md: 10,
        sm: 10,
        xl: 10,
        xs: 10,
        xxl: 10
    }
};

export const colors = {
    /** Page background color. ![#F2F4F7](https://via.placeholder.com/12/F2F4F7/F2F4F7.png) `#F2F4F7`. */
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