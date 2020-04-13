import { RxTranslateConfig } from "../interface/rx-translate-config";

export const translateConfigContainer:
    {
        config: RxTranslateConfig;
        loading: boolean;
    } = new (class {
        config: RxTranslateConfig;
        loading: boolean;
    })();