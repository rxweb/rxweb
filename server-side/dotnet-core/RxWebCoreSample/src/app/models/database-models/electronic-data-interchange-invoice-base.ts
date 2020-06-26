import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ElectronicDataInterchangeInvoiceBase {

//#region electronicDataInterchangeInvoiceId Prop
        @prop()
        electronicDataInterchangeInvoiceId : number;
//#endregion electronicDataInterchangeInvoiceId Prop


//#region electronicDataInterchangeInvoiceTypeId Prop
        @required()
        electronicDataInterchangeInvoiceTypeId : any;
//#endregion electronicDataInterchangeInvoiceTypeId Prop


//#region buyerCompanyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerCompanyId : number;
//#endregion buyerCompanyId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region invoiceDate Prop
        @prop()
        invoiceDate : Date;
//#endregion invoiceDate Prop


//#region userInvoiceNumber Prop
        @maxLength({value:4000})
        userInvoiceNumber : string;
//#endregion userInvoiceNumber Prop


//#region price Prop
        @prop()
        price : number;
//#endregion price Prop


//#region financialLineItemId Prop
        @prop()
        financialLineItemId : number;
//#endregion financialLineItemId Prop


//#region serviceFeeInvoiceId Prop
        @prop()
        serviceFeeInvoiceId : number;
//#endregion serviceFeeInvoiceId Prop


//#region electronicDataInterchangeBatchId Prop
        @prop()
        electronicDataInterchangeBatchId : number;
//#endregion electronicDataInterchangeBatchId Prop











}