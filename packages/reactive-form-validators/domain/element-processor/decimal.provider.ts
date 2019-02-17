import { Injectable, Inject, LOCALE_ID } from "@angular/core"
import { getLocaleNumberSymbol, NumberSymbol } from "@angular/common"
import { AbstractControl } from "@angular/forms"
import { DecimalPipe } from "@angular/common"
import { RegexValidator } from '../../util/regex-validator';
import { BLANK } from "../../const"
import { ReactiveFormConfig } from "packages/reactive-form-validators/util/reactive-form-config";


@Injectable()
export class DecimalProvider {
    private decimalSeperator:string = ".";
    private groupSeperator:string = ",";

    constructor(
        private decimalPipe: DecimalPipe,@Inject(LOCALE_ID) private localeId: string
        ) {
            if(ReactiveFormConfig.json && ReactiveFormConfig.json.localeId)
                this.localeId = ReactiveFormConfig.json.localeId;
            this.decimalSeperator = getLocaleNumberSymbol(localeId, NumberSymbol.Decimal);;
            this.groupSeperator =   getLocaleNumberSymbol(localeId, NumberSymbol.Group);
            this.setSymbolInConfig();
    }

    replacer(value:any): void {
            value =String(value).split(this.groupSeperator).join(BLANK);
            var splitValue = value.split(this.decimalSeperator);
            value = (splitValue.length > 1 && splitValue[1] && RegexValidator.isZero(splitValue[1])) ? splitValue[0] : value;
            return value;
    }
    
    transFormDecimal(value:any,digitsInfo:string): string {
            return this.decimalPipe.transform(value.replace(this.decimalSeperator,"."), digitsInfo,this.localeId);
    }

    private setSymbolInConfig() {
        ReactiveFormConfig.number = {decimalSymbol:this.decimalSeperator,groupSymbol:this.groupSeperator};
    }
}
