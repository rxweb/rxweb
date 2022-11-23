import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PaymentRowStatusBase {

//#region paymentRowStatusId Prop
        @prop()
        paymentRowStatusId : any;
//#endregion paymentRowStatusId Prop


//#region paymentRowStatusName Prop
        @maxLength({value:100})
        paymentRowStatusName : string;
//#endregion paymentRowStatusName Prop

}