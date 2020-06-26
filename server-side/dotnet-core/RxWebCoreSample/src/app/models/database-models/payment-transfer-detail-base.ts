import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PaymentTransferDetailBase {

//#region paymentTransferDetailId Prop
        @prop()
        paymentTransferDetailId : number;
//#endregion paymentTransferDetailId Prop


//#region paymentTransferLogId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        paymentTransferLogId : number;
//#endregion paymentTransferLogId Prop


//#region financialLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        financialLineItemId : number;
//#endregion financialLineItemId Prop





}