import { NgModule } from '@angular/core';
import { RxTranslateModule} from "@rxweb/translate"

@NgModule({
    imports: [RxTranslateModule.forRoot({
        cacheLanguageWiseObject: true,
        globalFilePath: "assets/i18n/{{language-code}}/global.{{language-code}}.json",
        filePath: "assets/i18n/{{language-code}}/{{translation-name}}.{{language-code}}.json"        
    })],
    providers: [RxTranslateModule],
    exports: [RxTranslateModule],
})
export class RxWebModule { }

