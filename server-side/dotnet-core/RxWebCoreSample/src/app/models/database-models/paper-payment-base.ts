import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PaperPaymentBase {

//#region paymentLineItemId Prop
        @prop()
        paymentLineItemId : number;
//#endregion paymentLineItemId Prop


//#region paperPaymentLineItemId Prop
        @prop()
        paperPaymentLineItemId : number;
//#endregion paperPaymentLineItemId Prop





}