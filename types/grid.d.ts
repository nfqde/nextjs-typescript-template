import '@nfq/react-grid';
import type {breakpoints, configType} from 'UI/utils/globalStyles';

declare module '@nfq/react-grid' {
    export interface UserConfig {
        UserConfig: {
            Breakpoints: typeof breakpoints;
            Config: typeof configType;
        };
    }
}