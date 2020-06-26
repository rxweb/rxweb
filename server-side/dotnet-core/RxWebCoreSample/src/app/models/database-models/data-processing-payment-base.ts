import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DataProcessingPaymentBase {

//#region paymentLineItemId Prop
        @prop()
        paymentLineItemId : number;
//#endregion paymentLineItemId Prop


//#region dataProcPaymentLineItemId Prop
        @prop()
        dataProcPaymentLineItemId : number;
//#endregion dataProcPaymentLineItemId Prop





}