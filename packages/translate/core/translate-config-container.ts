import { RxTranslateConfig } from "../interface/rx-translate-config";

export const translateConfigContainer:
    {
        config: RxTranslateConfig;
    } = new (class {
        config: RxTranslateConfig;
    })();