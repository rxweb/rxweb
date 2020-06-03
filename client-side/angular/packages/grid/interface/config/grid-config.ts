import { SpaConfig } from "./spa-config"
import { GridColumnConfig } from "./grid-column-config"

export class GridConfig{
    spa?: SpaConfig
    actions?: { [key: string]: Function }
    columns?: {
        startColumnIndex: number,
        columnConfigs: GridColumnConfig[];
    }
}