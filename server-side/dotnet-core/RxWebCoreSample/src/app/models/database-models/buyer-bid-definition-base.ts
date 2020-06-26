import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerBidDefinitionBase {

//#region buyerBidDefinitionId Prop
        @prop()
        buyerBidDefinitionId : number;
//#endregion buyerBidDefinitionId Prop


//#region buyerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerId : number;
//#endregion buyerId Prop


//#region bidTypeId Prop
        @required()
        bidTypeId : any;
//#endregion bidTypeId Prop


//#region bidDefinitionTypeId Prop
        @required()
        bidDefinitionTypeId : any;
//#endregion bidDefinitionTypeId Prop


//#region awardThreshold Prop
        @prop()
        awardThreshold : number;
//#endregion awardThreshold Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop











}