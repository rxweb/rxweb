import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerVendorComponentStatusBase {

//#region buyerVendorComponentStatusId Prop
        @prop()
        buyerVendorComponentStatusId : any;
//#endregion buyerVendorComponentStatusId Prop


//#region statusTypeId Prop
        @prop()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_BuyerVendorComponentStatusName Prop
        @required()
        @maxLength({value:500})
        eN_BuyerVendorComponentStatusName : string;
//#endregion eN_BuyerVendorComponentStatusName Prop


//#region fR_BuyerVendorComponentStatusName Prop
        @required()
        @maxLength({value:500})
        fR_BuyerVendorComponentStatusName : string;
//#endregion fR_BuyerVendorComponentStatusName Prop







}