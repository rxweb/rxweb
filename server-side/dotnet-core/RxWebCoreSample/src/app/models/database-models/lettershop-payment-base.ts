import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LettershopPaymentBase {

//#region paymentLineItemId Prop
        @prop()
        paymentLineItemId : number;
//#endregion paymentLineItemId Prop


//#region lettershopPaymentLineItemId Prop
        @prop()
        lettershopPaymentLineItemId : number;
//#endregion lettershopPaymentLineItemId Prop





}