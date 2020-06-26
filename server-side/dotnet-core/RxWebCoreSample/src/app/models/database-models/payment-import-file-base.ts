import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PaymentImportFileBase {

//#region paymentImportFileId Prop
        @prop()
        paymentImportFileId : number;
//#endregion paymentImportFileId Prop


//#region fileName Prop
        @required()
        @maxLength({value:100})
        fileName : string;
//#endregion fileName Prop


//#region fileDate Prop
        @prop()
        fileDate : Date;
//#endregion fileDate Prop


//#region importDate Prop
        @prop()
        importDate : Date;
//#endregion importDate Prop


//#region importUser Prop
        @required()
        @maxLength({value:100})
        importUser : string;
//#endregion importUser Prop


//#region paymentFileStatusId Prop
        @required()
        paymentFileStatusId : any;
//#endregion paymentFileStatusId Prop



}