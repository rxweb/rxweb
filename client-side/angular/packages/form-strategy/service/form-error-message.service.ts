import { Observable, Subscription } from "rxjs";
import { Inject, Injectable } from "@angular/core";
import { FormErrorMessageModuleConfig } from "../interface/form-error-message-module-config";
import { I18nPackage } from "../enums";
import { DataConfig } from "../interface/data-config";
import { I18N_PACKAGE_KEYS } from "../const/i18n-package.keys";

@Injectable()
export class FormErrorMessageService {
    private subscription: Subscription;
    constructor(@Inject('config') private config: FormErrorMessageModuleConfig) {

    }

    use(observable: Observable<any>) {
        this.subscription = observable.subscribe(t => {
            let dataConfig = this.getValue(t);
            this.useData(dataConfig.language, dataConfig.data);
        })
    }
    useData(language: string, data: { [key: string]: any }) {
        this.config.data = data;
        this.config.language = language
    }

    private getValue(data: any) {
        let dataConfig: DataConfig = null;
        if (this.config.i18n) {
            switch (<any>this.config.i18n) {
                case I18nPackage.NgxTranslate:
                    dataConfig = {
                        language: data[I18N_PACKAGE_KEYS.ngxTranslate.language], data: data[I18N_PACKAGE_KEYS.ngxTranslate.translation]
                    }
                    break;
                case I18nPackage.Transloco:
                    dataConfig = {
                        language: data[I18N_PACKAGE_KEYS.transloco.language], data: data[I18N_PACKAGE_KEYS.ngxTranslate.data]
                    }
                    break;
                case I18nPackage.AngularL10n:
                    dataConfig = {
                        language: data[I18N_PACKAGE_KEYS.ngxTranslate.language], data: data[I18N_PACKAGE_KEYS.ngxTranslate.data]
                    }
                    break;
                case I18nPackage.AngularI18Next:
                    dataConfig = {
                        language: data[I18N_PACKAGE_KEYS.ngxTranslate.language], data: data[I18N_PACKAGE_KEYS.ngxTranslate.data]
                    }
                    break;
            }
        }
        return dataConfig;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        
    }
}