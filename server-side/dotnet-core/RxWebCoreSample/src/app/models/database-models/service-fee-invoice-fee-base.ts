import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceFeeInvoiceFeeBase {

//#region serviceFeeInvoiceFeeId Prop
        @prop()
        serviceFeeInvoiceFeeId : number;
//#endregion serviceFeeInvoiceFeeId Prop


//#region serviceFeeInvoiceId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        serviceFeeInvoiceId : number;
//#endregion serviceFeeInvoiceId Prop


//#region serviceFeeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        serviceFeeId : number;
//#endregion serviceFeeId Prop





}