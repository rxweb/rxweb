import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidTypeBase {

//#region invitationForBidTypeId Prop
        @prop()
        invitationForBidTypeId : number;
//#endregion invitationForBidTypeId Prop


//#region invitationForBidTypeName Prop
        @maxLength({value:100})
        invitationForBidTypeName : string;
//#endregion invitationForBidTypeName Prop


//#region invitationForBidTypeShort Prop
        @required()
        @maxLength({value:1})
        invitationForBidTypeShort : string;
//#endregion invitationForBidTypeShort Prop


//#region productId Prop
        @required()
        productId : any;
//#endregion productId Prop







}