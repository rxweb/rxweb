import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidTypeBase {

//#region bidTypeId Prop
        @prop()
        bidTypeId : any;
//#endregion bidTypeId Prop


//#region rightId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        rightId : number;
//#endregion rightId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_BidTypeName Prop
        @required()
        @maxLength({value:500})
        eN_BidTypeName : string;
//#endregion eN_BidTypeName Prop


//#region fR_BidTypeName Prop
        @required()
        @maxLength({value:500})
        fR_BidTypeName : string;
//#endregion fR_BidTypeName Prop





}