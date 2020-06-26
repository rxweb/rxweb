import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecFinancialItemBase {

//#region specFinancialItemId Prop
        @prop()
        specFinancialItemId : number;
//#endregion specFinancialItemId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region financialItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        financialItemId : number;
//#endregion financialItemId Prop


//#region workingFinancialItemId Prop
        @prop()
        workingFinancialItemId : number;
//#endregion workingFinancialItemId Prop


//#region specItemInitialStatusId Prop
        @required()
        specItemInitialStatusId : any;
//#endregion specItemInitialStatusId Prop


//#region specItemCurrentStatusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specItemCurrentStatusId : number;
//#endregion specItemCurrentStatusId Prop


//#region shared Prop
        @required()
        @maxLength({value:1})
        shared : string;
//#endregion shared Prop











}