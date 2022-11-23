import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidProofMappingBase {

//#region invitationForBidProofMappingId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        invitationForBidProofMappingId : number;
//#endregion invitationForBidProofMappingId Prop


//#region invitationForBidId Prop
        @prop()
        invitationForBidId : number;
//#endregion invitationForBidId Prop


//#region proofId Prop
        @prop()
        proofId : number;
//#endregion proofId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop



}