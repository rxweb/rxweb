import { localizationContainer } from "../core/localization-container"

export function multilingual(keyName: string) {
    return function (
        target: any
    ) {
        localizationContainer.addModelDecorator(target, keyName,"multilingual")
    }
}
