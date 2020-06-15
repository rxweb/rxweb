import { NgModule, ModuleWithProviders, Inject, Injector } from "@angular/core";
import { FormErrorMessageModuleConfig } from "../interface/form-error-message-module-config";
import { errorMessageContainer } from "../core/error-message.containter";
export const CONFIG: string = "config";
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, I18nPluralPipe, I18nSelectPipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from "@angular/common";

import { FormErrorMessageService } from "../service/form-error-message.service";
import { ExtendFormModel } from "../extensions/extend-form-model";



@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [CurrencyPipe, DatePipe, DecimalPipe, I18nPluralPipe, I18nSelectPipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe],
    exports: []
})
export class RxFormErrorMessagesModule {
    constructor(@Inject(CONFIG) config: FormErrorMessageModuleConfig, injector: Injector) {
        if (!errorMessageContainer.config) {
            errorMessageContainer.config = config;
            let extendModel = new ExtendFormModel();
            extendModel.extend(config);
        }
        errorMessageContainer.injector = injector;
    }
    static forRoot(config: FormErrorMessageModuleConfig): ModuleWithProviders<RxFormErrorMessagesModule> {
        return {
            ngModule: RxFormErrorMessagesModule, providers: [{ provide: CONFIG, useValue: config }, FormErrorMessageService]
        };
    }
}
