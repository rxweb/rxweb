import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecFinancialItemFinancialLineItemBase {

//#region specId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specId : number;
//#endregion specId Prop


//#region specFinancialItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specFinancialItemId : number;
//#endregion specFinancialItemId Prop


//#region financialLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        financialLineItemId : number;
//#endregion financialLineItemId Prop





}