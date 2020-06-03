import { GridColumnConfig } from "../interface/config/grid-column-config"
import { gridContainer } from "../core/gridContainer"

export function gridColumn(config?: GridColumnConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        gridContainer.addColumn(target.constructor, propertyKey, config)
    }
}

