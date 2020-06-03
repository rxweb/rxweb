import { GridColumnConfig } from "../interface/config/grid-column-config"
import { gridContainer } from "../core/gridContainer"

export function actionColumn(config?: GridColumnConfig) {
    return function (
        target: Object
    ) {
        gridContainer.addColumn(target, "action", config)
    }
}

