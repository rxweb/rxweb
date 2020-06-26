import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FinancialCostAllocationBase {

//#region financialCostAllocationId Prop
        @prop()
        financialCostAllocationId : number;
//#endregion financialCostAllocationId Prop


//#region financialLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        financialLineItemId : number;
//#endregion financialLineItemId Prop


//#region financialCostAllocationName Prop
        @maxLength({value:100})
        financialCostAllocationName : string;
//#endregion financialCostAllocationName Prop


//#region cost Prop
        @required()
        cost : number;
//#endregion cost Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop



}