import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CurrencyFormatMaskBase {

//#region currencyFormatMaskId Prop
        @prop()
        currencyFormatMaskId : any;
//#endregion currencyFormatMaskId Prop


//#region currencyFormatMaskName Prop
        @required()
        @maxLength({value:4000})
        currencyFormatMaskName : string;
//#endregion currencyFormatMaskName Prop


//#region currencyFormatMaskDisplay Prop
        @required()
        @maxLength({value:4000})
        currencyFormatMaskDisplay : string;
//#endregion currencyFormatMaskDisplay Prop


//#region currencyJsFormatMask Prop
        @required()
        @maxLength({value:4000})
        currencyJsFormatMask : string;
//#endregion currencyJsFormatMask Prop


//#region currencyId Prop
        @required()
        currencyId : any;
//#endregion currencyId Prop


//#region currencyFormatMaskTypeId Prop
        @required()
        currencyFormatMaskTypeId : any;
//#endregion currencyFormatMaskTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop







}