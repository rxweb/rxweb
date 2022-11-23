import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FinancialLineItemStatusBase {

//#region financialLineItemStatusId Prop
        @prop()
        financialLineItemStatusId : any;
//#endregion financialLineItemStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_FinancialLineItemStatusName Prop
        @required()
        @maxLength({value:500})
        eN_FinancialLineItemStatusName : string;
//#endregion eN_FinancialLineItemStatusName Prop


//#region fR_FinancialLineItemStatusName Prop
        @maxLength({value:500})
        fR_FinancialLineItemStatusName : string;
//#endregion fR_FinancialLineItemStatusName Prop



}