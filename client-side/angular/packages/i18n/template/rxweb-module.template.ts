import { rxWebConfig } from "../core/rxweb-config"

export function getModuleTemplate() {
    let i18nPath = rxWebConfig.config.translate.path.i18n.replace('src/',"");
    return `import { NgModule } from '@angular/core';
import { RxTranslateModule} from "@rxweb/translate"

@NgModule({
    imports: [
        RxTranslateModule
    ],
    providers: [{
            cacheLanguageWiseObject: true,
            globalFilePath: "${i18nPath}/{{language-code}}/global.{{language-code}}.json",
            filePath: "${i18nPath}/{{language-code}}/{{translation-name}}.{{language-code}}.json"
    }],
    exports: [RxTranslateModule],
})
export class RxWebModule { }

`

}
