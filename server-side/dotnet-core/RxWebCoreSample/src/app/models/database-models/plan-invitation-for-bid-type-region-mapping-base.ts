import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PlanInvitationForBidTypeRegionMappingBase {

//#region planInvitationForBidTypeRegionMappingId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        planInvitationForBidTypeRegionMappingId : number;
//#endregion planInvitationForBidTypeRegionMappingId Prop


//#region planId Prop
        @prop()
        planId : number;
//#endregion planId Prop


//#region invitationForBidTypeId Prop
        @prop()
        invitationForBidTypeId : number;
//#endregion invitationForBidTypeId Prop


//#region regionId Prop
        @prop()
        regionId : number;
//#endregion regionId Prop







}