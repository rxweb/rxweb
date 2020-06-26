import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidResultBase {

//#region invitationForBidResultId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        invitationForBidResultId : number;
//#endregion invitationForBidResultId Prop


//#region invitationForBidId Prop
        @prop()
        invitationForBidId : number;
//#endregion invitationForBidId Prop


//#region governmentPublishingOfficeContractorId Prop
        @prop()
        governmentPublishingOfficeContractorId : number;
//#endregion governmentPublishingOfficeContractorId Prop


//#region governmentPublishingOfficeStateId Prop
        @prop()
        governmentPublishingOfficeStateId : number;
//#endregion governmentPublishingOfficeStateId Prop


//#region contractorName Prop
        @maxLength({value:50})
        contractorName : string;
//#endregion contractorName Prop


//#region bidPrice Prop
        @prop()
        bidPrice : any;
//#endregion bidPrice Prop


//#region discount Prop
        @prop()
        discount : any;
//#endregion discount Prop


//#region discountDays Prop
        @prop()
        discountDays : number;
//#endregion discountDays Prop


//#region discountPrice Prop
        @prop()
        discountPrice : any;
//#endregion discountPrice Prop


//#region details Prop
        @prop()
        details : string;
//#endregion details Prop


//#region bidComment Prop
        @prop()
        bidComment : string;
//#endregion bidComment Prop


//#region invitationForBidResultStatusId Prop
        @required()
        invitationForBidResultStatusId : any;
//#endregion invitationForBidResultStatusId Prop


//#region amendmentSacKnowledged Prop
        @maxLength({value:20})
        amendmentSacKnowledged : string;
//#endregion amendmentSacKnowledged Prop





}