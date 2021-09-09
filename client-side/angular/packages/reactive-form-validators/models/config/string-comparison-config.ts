import { DefaultConfig } from './default-config'
export interface StringComparisonConfig extends DefaultConfig {
    isRestrict?: boolean;
    values?: any[];
}
