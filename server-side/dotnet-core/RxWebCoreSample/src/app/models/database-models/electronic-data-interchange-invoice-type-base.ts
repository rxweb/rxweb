import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ElectronicDataInterchangeInvoiceTypeBase {

//#region electronicDataInterchangeInvoiceTypeId Prop
        @prop()
        electronicDataInterchangeInvoiceTypeId : any;
//#endregion electronicDataInterchangeInvoiceTypeId Prop


//#region electronicDataInterchangeInvoiceTypeName Prop
        @maxLength({value:100})
        electronicDataInterchangeInvoiceTypeName : string;
//#endregion electronicDataInterchangeInvoiceTypeName Prop



}