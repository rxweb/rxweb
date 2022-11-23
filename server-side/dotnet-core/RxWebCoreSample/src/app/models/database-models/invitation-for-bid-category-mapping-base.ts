import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidCategoryMappingBase {

//#region invitationForBidCategoryMappingId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        invitationForBidCategoryMappingId : number;
//#endregion invitationForBidCategoryMappingId Prop


//#region invitationForBidId Prop
        @prop()
        invitationForBidId : number;
//#endregion invitationForBidId Prop


//#region categoryId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        categoryId : number;
//#endregion categoryId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop



}