import {createGlobalStyle} from 'styled-components';

import LatoBold from '../../public/fonts/lato-bold.woff2';
import LatoRegular from '../../public/fonts/lato-regular.woff2';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-display: swap;
        font-family: 'Lato';
        src: url(${LatoBold}) format('woff2');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-display: swap;
        font-family: 'Lato';
        src: url(${LatoRegular}) format('woff2');
        font-weight: bold;
        font-style: normal;
    }

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

    html, body, #__cy_root {
        height: 100%;
        margin: 0;
        overflow: hidden;
        padding: 0;
        width: 100%;
        scroll-behavior: smooth;
    }
`;