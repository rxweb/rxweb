import { rxWebConfig } from "../../core/rxweb-config"
export class TranslatePathProvider{
    constructor(protected basePath: string) {
        
    }

    get optimizeJson(): string {
        return rxWebConfig.config.translate.path.optimizeJson ? `${this.basePath}\\${rxWebConfig.config.translate.path.optimizeJson}` : undefined;
    }

    get i18n(): string {
        return rxWebConfig.config.translate.path.i18n ? `${this.basePath}\\${rxWebConfig.config.translate.path.i18n}` : undefined;
    }

    get component(): string {
        return rxWebConfig.config.translate.path.component ? `${this.basePath}\\${rxWebConfig.config.translate.path.component}` : undefined;
    }

    get interface(): string {
        return rxWebConfig.config.translate.path.generate.interface ? `${this.basePath}\\${rxWebConfig.config.translate.path.generate.interface}` : undefined;
    }



}
