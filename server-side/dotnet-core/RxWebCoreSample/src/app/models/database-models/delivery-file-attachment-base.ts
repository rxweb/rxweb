import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DeliveryFileAttachmentBase {

//#region deliveryFileAttachmentId Prop
        @prop()
        deliveryFileAttachmentId : number;
//#endregion deliveryFileAttachmentId Prop


//#region jobFileAttachmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobFileAttachmentId : number;
//#endregion jobFileAttachmentId Prop


//#region deliveryDetailId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        deliveryDetailId : number;
//#endregion deliveryDetailId Prop





}