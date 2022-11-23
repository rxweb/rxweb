import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PaymentFileStatusBase {

//#region paymentFileStatusId Prop
        @prop()
        paymentFileStatusId : any;
//#endregion paymentFileStatusId Prop


//#region paymentFileStatusName Prop
        @maxLength({value:100})
        paymentFileStatusName : string;
//#endregion paymentFileStatusName Prop



}