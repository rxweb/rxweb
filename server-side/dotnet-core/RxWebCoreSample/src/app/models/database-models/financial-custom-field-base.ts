import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FinancialCustomFieldBase {

//#region financialCustomFieldId Prop
        @prop()
        financialCustomFieldId : number;
//#endregion financialCustomFieldId Prop


//#region financialLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        financialLineItemId : number;
//#endregion financialLineItemId Prop


//#region financialCustomFieldTitleId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        financialCustomFieldTitleId : number;
//#endregion financialCustomFieldTitleId Prop


//#region financialCustomFieldName Prop
        @maxLength({value:100})
        financialCustomFieldName : string;
//#endregion financialCustomFieldName Prop





}