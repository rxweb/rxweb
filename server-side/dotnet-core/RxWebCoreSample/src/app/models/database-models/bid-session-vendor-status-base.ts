import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidSessionVendorStatusBase {

//#region bidSessionVendorStatusId Prop
        @prop()
        bidSessionVendorStatusId : any;
//#endregion bidSessionVendorStatusId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_BidSessionVendorStatusName Prop
        @required()
        @maxLength({value:500})
        eN_BidSessionVendorStatusName : string;
//#endregion eN_BidSessionVendorStatusName Prop


//#region fR_BidSessionVendorStatusName Prop
        @required()
        @maxLength({value:500})
        fR_BidSessionVendorStatusName : string;
//#endregion fR_BidSessionVendorStatusName Prop



}