import { RxWebConfig } from "../interface/rxweb-config";

export const RXWEB_CONFIG_JSON: RxWebConfig = {
    "translate": {
        "defaultLanguage": "en",
        "allowedLanguages": ["en"],
        "path": {
            "optimizeJson": "",
            "i18n": "",
            "component": "",
            "generate": {
                "interface": ""
            }
        },
        "action": {
            "createMissingFiles": true,
            "createMissingKeys": true,
            "removeNotInUsedKeys": true,
            "validateDuplicateKeys": true
        }
    }
}
