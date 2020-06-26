import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidResultStatusBase {

//#region invitationForBidResultStatusId Prop
        @prop()
        invitationForBidResultStatusId : any;
//#endregion invitationForBidResultStatusId Prop


//#region invitationForBidResultStatusName Prop
        @maxLength({value:100})
        invitationForBidResultStatusName : string;
//#endregion invitationForBidResultStatusName Prop



}