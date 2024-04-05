import {configureFonts, getFontThemeList} from '@nfq/next-fonts';
import {darken} from '@nfq/react-grid';
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
    baseSpacing: 0.4,
    container: {
        lg: 'fluid',
        md: 'fluid',
        sm: 'fluid',
        xl: 1140,
        xs: 'fluid',
        xxl: 1140
    }
};

/**
 * Base colors used in the application.
 */
export const BaseColors = {
    /** Page background color. ![#FFFFFF](https://via.placeholder.com/12/FFFFFF/FFFFFF.png) `#FFFFFF`. */
    pageBackground: '#FFFFFF',
    /** Primary font color. ![#192630](https://via.placeholder.com/12/192630/192630.png) `#192630`. */
    primaryFontColor: '#192630'
} as const;

/**
 * Derived colors used in the application.
 * Use this for colors made with `darken`, `lighten` and `translucify`.
 */
export const DerivedColors = {
    /** Darker Page background color. ![#FDFDFD](https://via.placeholder.com/12/FDFDFD/FDFDFD.png) `#FDFDFD`. */
    darkerPageColor: darken(BaseColors.pageBackground, 10)
} as const;

export enum BoxShadows {
    /** The default dropshadow for Popovers. */
    popOverShadow = '0px 0px 10px 5px rgba(25, 38, 48, 0.05)'
}

export const theme: DefaultTheme = {
    boxShadows: BoxShadows,
    colors: {
        ...BaseColors,
        ...DerivedColors
    },
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
        color: ${({theme: globalTheme}) => globalTheme.colors.primaryFontColor};
        margin: 0;
        min-height: 100%;
        padding: 0;
        scroll-behavior: smooth;
    }

    #__next {
        min-height: 100%;
    }
`;