import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PostagePaymentBase {

//#region paymentLineItemId Prop
        @prop()
        paymentLineItemId : number;
//#endregion paymentLineItemId Prop


//#region postagePaymentLineItemId Prop
        @prop()
        postagePaymentLineItemId : number;
//#endregion postagePaymentLineItemId Prop





}