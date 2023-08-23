// import original module declarations
import 'styled-components';
import type {BoxShadows, Colors, fontDefinitions} from 'UI/utils/globalStyles';

import type {FontList} from '@nfq/next-fonts';
import type {Config} from '@nfq/react-grid';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        boxShadows: typeof BoxShadows;
        colors: typeof Colors;
        fonts: FontList<typeof fontDefinitions>;
        nfqgrid: Config;
    }
}