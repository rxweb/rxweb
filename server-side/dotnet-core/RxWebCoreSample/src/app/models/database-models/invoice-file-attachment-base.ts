import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class InvoiceFileAttachmentBase {

//#region invoiceFileAttachmentId Prop
        @prop()
        invoiceFileAttachmentId : number;
//#endregion invoiceFileAttachmentId Prop


//#region jobFileAttachmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobFileAttachmentId : number;
//#endregion jobFileAttachmentId Prop


//#region jobThreadId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobThreadId : number;
//#endregion jobThreadId Prop


//#region stepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        stepId : number;
//#endregion stepId Prop





}