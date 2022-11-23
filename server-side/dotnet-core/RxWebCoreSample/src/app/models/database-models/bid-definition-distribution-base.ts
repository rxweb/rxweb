import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidDefinitionDistributionBase {

//#region bidDefinitionDistributionId Prop
        @prop()
        bidDefinitionDistributionId : number;
//#endregion bidDefinitionDistributionId Prop


//#region bidDistributionId Prop
        @required()
        bidDistributionId : any;
//#endregion bidDistributionId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region buyerBidDefinitionId Prop
        @prop()
        buyerBidDefinitionId : number;
//#endregion buyerBidDefinitionId Prop





}