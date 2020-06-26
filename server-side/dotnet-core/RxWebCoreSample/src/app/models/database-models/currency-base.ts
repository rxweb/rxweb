import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CurrencyBase {

//#region currencyid Prop
        @prop()
        currencyid : any;
//#endregion currencyid Prop


//#region currencyName Prop
        @required()
        @maxLength({value:4000})
        currencyName : string;
//#endregion currencyName Prop


//#region currencyFormatMaskId Prop
        @required()
        currencyFormatMaskId : any;
//#endregion currencyFormatMaskId Prop


//#region territoryId Prop
        @required()
        territoryId : any;
//#endregion territoryId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop









}