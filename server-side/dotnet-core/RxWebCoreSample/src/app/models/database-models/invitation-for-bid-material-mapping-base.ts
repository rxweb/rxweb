import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvitationForBidMaterialMappingBase {

//#region invitationForBidMaterialMappingId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        invitationForBidMaterialMappingId : number;
//#endregion invitationForBidMaterialMappingId Prop


//#region invitationForBidid Prop
        @prop()
        invitationForBidid : number;
//#endregion invitationForBidid Prop


//#region materialsId Prop
        @prop()
        materialsId : number;
//#endregion materialsId Prop


//#region quantity Prop
        @prop()
        quantity : number;
//#endregion quantity Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop





}