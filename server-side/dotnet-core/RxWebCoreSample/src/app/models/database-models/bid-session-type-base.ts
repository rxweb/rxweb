import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidSessionTypeBase {

//#region bidSessionTypeId Prop
        @prop()
        bidSessionTypeId : any;
//#endregion bidSessionTypeId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_BidSessionTypeName Prop
        @required()
        @maxLength({value:500})
        eN_BidSessionTypeName : string;
//#endregion eN_BidSessionTypeName Prop


//#region fR_BidSessionTypeName Prop
        @maxLength({value:500})
        fR_BidSessionTypeName : string;
//#endregion fR_BidSessionTypeName Prop



}