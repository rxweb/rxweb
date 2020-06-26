import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidBasisDetailBase {

//#region invitationForBidBasisDetailId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        invitationForBidBasisDetailId : number;
//#endregion invitationForBidBasisDetailId Prop


//#region invitationForBidId Prop
        @prop()
        invitationForBidId : number;
//#endregion invitationForBidId Prop


//#region lineItemId Prop
        @prop()
        lineItemId : number;
//#endregion lineItemId Prop


//#region lineName Prop
        @maxLength({value:200})
        lineName : string;
//#endregion lineName Prop


//#region lineDescription Prop
        @maxLength({value:200})
        lineDescription : string;
//#endregion lineDescription Prop


//#region basis Prop
        @prop()
        basis : any;
//#endregion basis Prop





}