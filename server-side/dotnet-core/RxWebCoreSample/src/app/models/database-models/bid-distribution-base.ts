import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidDistributionBase {

//#region bidDistributionId Prop
        @prop()
        bidDistributionId : any;
//#endregion bidDistributionId Prop


//#region rightId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        rightId : number;
//#endregion rightId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_BidDistributionName Prop
        @required()
        @maxLength({value:500})
        eN_BidDistributionName : string;
//#endregion eN_BidDistributionName Prop


//#region fR_BidDistributionName Prop
        @required()
        @maxLength({value:500})
        fR_BidDistributionName : string;
//#endregion fR_BidDistributionName Prop





}