import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidBasisResultBase {

//#region invitationForBidBasisResultId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        invitationForBidBasisResultId : number;
//#endregion invitationForBidBasisResultId Prop


//#region invitationForBidId Prop
        @prop()
        invitationForBidId : number;
//#endregion invitationForBidId Prop


//#region lineItemId Prop
        @prop()
        lineItemId : number;
//#endregion lineItemId Prop


//#region governmentPublishingOfficeContractorId Prop
        @prop()
        governmentPublishingOfficeContractorId : number;
//#endregion governmentPublishingOfficeContractorId Prop


//#region governmentPublishingOfficeStateId Prop
        @prop()
        governmentPublishingOfficeStateId : number;
//#endregion governmentPublishingOfficeStateId Prop


//#region linePrice Prop
        @prop()
        linePrice : any;
//#endregion linePrice Prop





}