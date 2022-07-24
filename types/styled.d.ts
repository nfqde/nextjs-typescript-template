// import original module declarations
import 'styled-components';
import type {IConfig} from '@nfq/react-grid';

// and extend them!
declare module 'styled-components' {
    type Colors = {
        /** Page background color. ![#F2F4F7](https://via.placeholder.com/12/F2F4F7/F2F4F7.png) `#F2F4F7`. */
        pageBackground: string;
    };

    export interface DefaultTheme {
        colors: Colors;
        nfqgrid: IConfig;
    }
}