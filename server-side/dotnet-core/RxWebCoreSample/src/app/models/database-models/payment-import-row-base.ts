import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PaymentImportRowBase {

//#region paymentImportRowId Prop
        @prop()
        paymentImportRowId : number;
//#endregion paymentImportRowId Prop


//#region paymentImportFileId Prop
        @prop()
        paymentImportFileId : number;
//#endregion paymentImportFileId Prop


//#region rowNumber Prop
        @prop()
        rowNumber : number;
//#endregion rowNumber Prop


//#region rowData Prop
        @maxLength({value:83})
        rowData : string;
//#endregion rowData Prop


//#region paymentRowStatusId Prop
        @required()
        paymentRowStatusId : any;
//#endregion paymentRowStatusId Prop



}