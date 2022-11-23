import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobUnInvitedBidderBase {

//#region jobUnInvitedBidderId Prop
        @prop()
        jobUnInvitedBidderId : number;
//#endregion jobUnInvitedBidderId Prop


//#region bidJobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidJobStepId : number;
//#endregion bidJobStepId Prop


//#region bidderUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidderUserId : number;
//#endregion bidderUserId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region createdBy Prop
        @prop()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @prop()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @prop()
        updatedDateTime : any;
//#endregion updatedDateTime Prop





}