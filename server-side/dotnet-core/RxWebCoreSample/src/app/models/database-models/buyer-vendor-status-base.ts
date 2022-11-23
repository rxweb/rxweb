import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerVendorStatusBase {

//#region buyerVendorStatusId Prop
        @prop()
        buyerVendorStatusId : any;
//#endregion buyerVendorStatusId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        displayOrder : number;
//#endregion displayOrder Prop


//#region eN_BuyerVendorStatusName Prop
        @required()
        @maxLength({value:500})
        eN_BuyerVendorStatusName : string;
//#endregion eN_BuyerVendorStatusName Prop


//#region fR_BuyerVendorStatusName Prop
        @maxLength({value:500})
        fR_BuyerVendorStatusName : string;
//#endregion fR_BuyerVendorStatusName Prop





}