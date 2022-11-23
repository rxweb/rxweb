import { gridContainer } from "../core/gridContainer"
import { GridConfiguration } from "../interface/config/grid-configuration"

export function grid(config?: GridConfiguration) {
    return function (
        target: Object,
    ) {
        gridContainer.setGridConfiguration(target, config)
    }
}