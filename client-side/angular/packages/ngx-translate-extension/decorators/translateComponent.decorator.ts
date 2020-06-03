import { TranslateConfig, translate } from "@rxweb/translate";


export function translateComponent(config?: TranslateConfig) {
    return function (
        target: any,
    ) {
        translate(config)(target, null);
    }
}

