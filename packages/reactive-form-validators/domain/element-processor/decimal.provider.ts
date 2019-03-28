import { Injectable, Inject, LOCALE_ID } from "@angular/core"
import { getLocaleNumberSymbol, NumberSymbol } from "@angular/common"
import { DecimalPipe } from "@angular/common"
import { RegexValidator } from '../../util/regex-validator';
import { BLANK } from "../../const"
import { ReactiveFormConfig } from "../../util/reactive-form-config";


@Injectable()
export class DecimalProvider {
    private decimalSeperator:string = ".";
    private groupSeperator:string = ",";
    private allowDecimalSymbol:string;
    constructor(
        private decimalPipe: DecimalPipe,@Inject(LOCALE_ID) private localeId: string
        ) {
            
                
            this.decimalSeperator = getLocaleNumberSymbol(localeId, NumberSymbol.Decimal);;
            this.groupSeperator =   getLocaleNumberSymbol(localeId, NumberSymbol.Group);
            this.setSymbolInConfig();
    }

    replacer(value:any): void {
        value =String(value);
        if(!this.isSetConfig)
            this.bindConfig();
            value =value.split(this.groupSeperator).join(BLANK);
            if(this.allowDecimalSymbol)
            value =value.replace(this.decimalSeperator,this.allowDecimalSymbol) 
            var splitValue = value.split(this.decimalSeperator);
            value = (splitValue.length > 1 && splitValue[1] && RegexValidator.isZero(splitValue[1])) ? splitValue[0] : value;
            return value;
    }
    
    transFormDecimal(value:any,digitsInfo:string): string {
        value = String(value);
            return this.decimalPipe.transform(value.replace(this.decimalSeperator,"."), digitsInfo,this.localeId);
    }

    private setSymbolInConfig() {
        ReactiveFormConfig.number = {decimalSymbol:this.decimalSeperator,groupSymbol:this.groupSeperator};
    }

    bindConfig(){
        if(ReactiveFormConfig.json){
            if(ReactiveFormConfig.json.localeId)
            this.localeId = ReactiveFormConfig.json.localeId;
            if(ReactiveFormConfig.json.allowDecimalSymbol)
            this.allowDecimalSymbol = ReactiveFormConfig.json.allowDecimalSymbol;
        }
        this.isSetConfig = true;
    }

    private isSetConfig:boolean = false;
}
