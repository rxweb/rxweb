import { Injectable, Inject, LOCALE_ID } from "@angular/core"
import { getLocaleNumberSymbol, NumberSymbol } from "@angular/common"
import { DecimalPipe } from "@angular/common"
import { RegexValidator } from '../../util/regex-validator';
import { BLANK } from "../../const"
import { ReactiveFormConfig } from "../../util/reactive-form-config";


@Injectable()
export class DecimalProvider {
    private decimalSeperator: string = ".";
    private groupSeperator: string = ",";
    private allowDecimalSymbol: string;
    constructor(
        private decimalPipe: DecimalPipe, @Inject(LOCALE_ID) private localeId: string
    ) {
        this.decimalSeperator = getLocaleNumberSymbol(localeId, NumberSymbol.Decimal);;
        this.groupSeperator = getLocaleNumberSymbol(localeId, NumberSymbol.Group);
        this.setSymbolInConfig();
    }

    replacer(value: any): any {
        value = String(value);
        if (!this.isSetConfig)
            this.bindConfig();
        value = value.split(this.groupSeperator).join(BLANK);
        if (this.allowDecimalSymbol)
            value = value.replace(this.decimalSeperator, this.allowDecimalSymbol)
        var splitValue = value.split(this.decimalSeperator);
        value = (splitValue.length > 1 && splitValue[1] && RegexValidator.isZero(splitValue[1])) ? splitValue[0] : value;
        return value;
    }

    transFormDecimal(value: any, digitsInfo: string,persistZero:boolean): string {
        value = String(value);
        if (!value) {
            return value;
        }
        let transformedValue = this.decimalPipe.transform(value.replace(ReactiveFormConfig.number.groupSymbol, "").replace(this.decimalSeperator, "."), digitsInfo, this.localeId);
        if (persistZero && value.indexOf(this.decimalSeperator)) {
            let splitTransformed = transformedValue.split(".");
            let splitDigitsInfo = digitsInfo ? digitsInfo.split("-") : [];
            let digits = splitDigitsInfo.length > 1 ? parseInt(splitDigitsInfo[splitDigitsInfo.length - 1]) : 0;
            if (splitTransformed.length > 1 && splitDigitsInfo.length > 0 && digits !== 0 && splitTransformed[1].length !== digits) {
                let diff = digits - splitTransformed[1].length;
                for (let i = 0; i < diff; i++) {
                    transformedValue += "0";
                }
            }
        }
        return transformedValue;
    }

    private setSymbolInConfig() {
        ReactiveFormConfig.number = { decimalSymbol: this.decimalSeperator, groupSymbol: this.groupSeperator };
    }

    bindConfig() {
        if (ReactiveFormConfig.json) {
            if (ReactiveFormConfig.json.localeId)
                this.localeId = ReactiveFormConfig.json.localeId;
            if (ReactiveFormConfig.json.allowDecimalSymbol)
                this.allowDecimalSymbol = ReactiveFormConfig.json.allowDecimalSymbol;
        }
        this.isSetConfig = true;
    }

    private isSetConfig: boolean = false;
}
