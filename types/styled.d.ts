// import original module declarations
import 'styled-components';
import type {colors, fontDefinitions} from 'Utils/globalStyles';

import type {FontList} from '@nfq/next-fonts';
import type {IConfig} from '@nfq/react-grid';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: typeof colors;
        fonts: FontList<typeof fontDefinitions>;
        nfqgrid: IConfig;
    }
}