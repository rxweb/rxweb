import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerFurnishedMaterialFileAttachmentBase {

//#region buyerFurnishedMaterialFileAttachmentId Prop
        @prop()
        buyerFurnishedMaterialFileAttachmentId : number;
//#endregion buyerFurnishedMaterialFileAttachmentId Prop


//#region jobFileAttachmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobFileAttachmentId : number;
//#endregion jobFileAttachmentId Prop


//#region buyerFurnishedMaterialId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerFurnishedMaterialId : number;
//#endregion buyerFurnishedMaterialId Prop





}