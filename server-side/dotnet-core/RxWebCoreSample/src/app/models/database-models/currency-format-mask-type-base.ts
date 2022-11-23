import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CurrencyFormatMaskTypeBase {

//#region currencyFormatMaskTypeId Prop
        @prop()
        currencyFormatMaskTypeId : any;
//#endregion currencyFormatMaskTypeId Prop


//#region eN_CurrencyFormatMaskType Prop
        @maxLength({value:20})
        eN_CurrencyFormatMaskType : string;
//#endregion eN_CurrencyFormatMaskType Prop


//#region fR_CurrencyFormatMaskType Prop
        @maxLength({value:20})
        fR_CurrencyFormatMaskType : string;
//#endregion fR_CurrencyFormatMaskType Prop



}