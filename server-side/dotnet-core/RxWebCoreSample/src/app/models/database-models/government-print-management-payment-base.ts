import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class GovernmentPrintManagementPaymentBase {

//#region governmentPrintManagementPaymentId Prop
        @prop()
        governmentPrintManagementPaymentId : number;
//#endregion governmentPrintManagementPaymentId Prop


//#region projectType Prop
        @maxLength({value:10})
        projectType : string;
//#endregion projectType Prop


//#region projectId Prop
        @maxLength({value:6})
        projectId : string;
//#endregion projectId Prop


//#region purchaseOrder Prop
        @maxLength({value:5})
        purchaseOrder : string;
//#endregion purchaseOrder Prop


//#region printOrder Prop
        @maxLength({value:5})
        printOrder : string;
//#endregion printOrder Prop


//#region jacket Prop
        @maxLength({value:6})
        jacket : string;
//#endregion jacket Prop


//#region awardDate Prop
        @prop()
        awardDate : Date;
//#endregion awardDate Prop


//#region issueDate Prop
        @prop()
        issueDate : Date;
//#endregion issueDate Prop


//#region paymentDate Prop
        @prop()
        paymentDate : Date;
//#endregion paymentDate Prop


//#region payment Prop
        @prop()
        payment : number;
//#endregion payment Prop


//#region governmentPublishingOfficeStateId Prop
        @prop()
        governmentPublishingOfficeStateId : number;
//#endregion governmentPublishingOfficeStateId Prop


//#region governmentPublishingOfficeContractorId Prop
        @prop()
        governmentPublishingOfficeContractorId : number;
//#endregion governmentPublishingOfficeContractorId Prop


//#region paymentImportRowId Prop
        @prop()
        paymentImportRowId : number;
//#endregion paymentImportRowId Prop


//#region processed Prop
        @maxLength({value:10})
        processed : string;
//#endregion processed Prop


//#region processDate Prop
        @prop()
        processDate : Date;
//#endregion processDate Prop


//#region paymentBatchId Prop
        @prop()
        paymentBatchId : number;
//#endregion paymentBatchId Prop



}