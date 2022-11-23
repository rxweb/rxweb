import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidbinderyMappingBase {

//#region invitationForBidbinderyMappingId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        invitationForBidbinderyMappingId : number;
//#endregion invitationForBidbinderyMappingId Prop


//#region invitationForBidId Prop
        @prop()
        invitationForBidId : number;
//#endregion invitationForBidId Prop


//#region binderyId Prop
        @prop()
        binderyId : any;
//#endregion binderyId Prop


//#region subbinderyId Prop
        @prop()
        subbinderyId : number;
//#endregion subbinderyId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop







}