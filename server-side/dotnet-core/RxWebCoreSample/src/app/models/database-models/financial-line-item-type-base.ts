import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FinancialLineItemTypeBase {

//#region financialLineItemTypeId Prop
        @prop()
        financialLineItemTypeId : any;
//#endregion financialLineItemTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_FinancialLineItemTypeName Prop
        @required()
        @maxLength({value:500})
        eN_FinancialLineItemTypeName : string;
//#endregion eN_FinancialLineItemTypeName Prop


//#region fR_FinancialLineItemTypeName Prop
        @maxLength({value:500})
        fR_FinancialLineItemTypeName : string;
//#endregion fR_FinancialLineItemTypeName Prop





}