import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PaymentTransferLogBase {

//#region paymentTransferLogId Prop
        @prop()
        paymentTransferLogId : number;
//#endregion paymentTransferLogId Prop


//#region companyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        companyId : number;
//#endregion companyId Prop


//#region recordCount Prop
        @prop()
        recordCount : number;
//#endregion recordCount Prop


//#region fileName Prop
        @maxLength({value:100})
        fileName : string;
//#endregion fileName Prop


//#region transferTotalAmount Prop
        @prop()
        transferTotalAmount : number;
//#endregion transferTotalAmount Prop


//#region processDate Prop
        @required()
        processDate : Date;
//#endregion processDate Prop


//#region xferFile Prop
        @prop()
        xferFile : string;
//#endregion xferFile Prop


//#region details Prop
        @maxLength({value:4000})
        details : string;
//#endregion details Prop





}