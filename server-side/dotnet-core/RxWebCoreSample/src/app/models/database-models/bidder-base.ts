import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidderBase {

//#region bidderId Prop
        @prop()
        bidderId : number;
//#endregion bidderId Prop


//#region buyerVendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerVendorId : number;
//#endregion buyerVendorId Prop


//#region bidderUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidderUserId : number;
//#endregion bidderUserId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop



}