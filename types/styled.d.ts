// import original module declarations
import 'styled-components';
import type {colors} from 'Utils/globalStyles';

import type {IConfig} from '@nfq/react-grid';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: typeof colors;
        nfqgrid: IConfig;
    }
}