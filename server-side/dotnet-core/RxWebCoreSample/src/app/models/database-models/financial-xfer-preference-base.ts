import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FinancialXferPreferenceBase {

//#region financialXferPreferenceId Prop
        @prop()
        financialXferPreferenceId : number;
//#endregion financialXferPreferenceId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region financialLineItemTypeId Prop
        @required()
        financialLineItemTypeId : any;
//#endregion financialLineItemTypeId Prop


//#region maxCostAllocations Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        maxCostAllocations : number;
//#endregion maxCostAllocations Prop


//#region allocationCaption Prop
        @maxLength({value:100})
        allocationCaption : string;
//#endregion allocationCaption Prop


//#region maxAllocationWidth Prop
        @prop()
        maxAllocationWidth : number;
//#endregion maxAllocationWidth Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region financialXferTypeId Prop
        @prop()
        financialXferTypeId : any;
//#endregion financialXferTypeId Prop







}