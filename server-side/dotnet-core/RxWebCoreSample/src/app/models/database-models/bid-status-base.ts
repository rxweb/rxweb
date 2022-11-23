import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidStatusBase {

//#region bidStatusId Prop
        @prop()
        bidStatusId : any;
//#endregion bidStatusId Prop


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


//#region eN_BidStatusName Prop
        @required()
        @maxLength({value:500})
        eN_BidStatusName : string;
//#endregion eN_BidStatusName Prop


//#region fR_BidStatusName Prop
        @required()
        @maxLength({value:500})
        fR_BidStatusName : string;
//#endregion fR_BidStatusName Prop



}