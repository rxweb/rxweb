import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidAmendmentBase {

//#region invitationForBidAmendmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        invitationForBidAmendmentId : number;
//#endregion invitationForBidAmendmentId Prop


//#region invitationForBidId Prop
        @prop()
        invitationForBidId : number;
//#endregion invitationForBidId Prop


//#region amendmentNumber Prop
        @prop()
        amendmentNumber : any;
//#endregion amendmentNumber Prop


//#region issueDate Prop
        @prop()
        issueDate : Date;
//#endregion issueDate Prop


//#region receiveDate Prop
        @prop()
        receiveDate : Date;
//#endregion receiveDate Prop


//#region openDate Prop
        @prop()
        openDate : Date;
//#endregion openDate Prop


//#region shipDate Prop
        @prop()
        shipDate : Date;
//#endregion shipDate Prop


//#region description Prop
        @maxLength({value:100})
        description : string;
//#endregion description Prop



}