import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidUrgencyBase {

//#region invitationForBidUrgencyId Prop
        @prop()
        invitationForBidUrgencyId : any;
//#endregion invitationForBidUrgencyId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_InvitationForBidUrgencyName Prop
        @required()
        @maxLength({value:500})
        eN_InvitationForBidUrgencyName : string;
//#endregion eN_InvitationForBidUrgencyName Prop


//#region fR_InvitationForBidUrgencyName Prop
        @required()
        @maxLength({value:500})
        fR_InvitationForBidUrgencyName : string;
//#endregion fR_InvitationForBidUrgencyName Prop

}