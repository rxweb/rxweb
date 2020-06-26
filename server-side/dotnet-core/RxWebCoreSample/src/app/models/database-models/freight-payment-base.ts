import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FreightPaymentBase {

//#region paymentLineItemId Prop
        @prop()
        paymentLineItemId : number;
//#endregion paymentLineItemId Prop


//#region freightPaymentLineItemId Prop
        @prop()
        freightPaymentLineItemId : number;
//#endregion freightPaymentLineItemId Prop





}