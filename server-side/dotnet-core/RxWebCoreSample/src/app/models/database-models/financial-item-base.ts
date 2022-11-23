import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FinancialItemBase {

//#region financialItemId Prop
        @prop()
        financialItemId : number;
//#endregion financialItemId Prop


//#region amount Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        amount : number;
//#endregion amount Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region postageAmount Prop
        @prop()
        postageAmount : number;
//#endregion postageAmount Prop


//#region letterShopAmount Prop
        @prop()
        letterShopAmount : number;
//#endregion letterShopAmount Prop


//#region freightAmount Prop
        @prop()
        freightAmount : number;
//#endregion freightAmount Prop


//#region dataProcessingAmount Prop
        @prop()
        dataProcessingAmount : number;
//#endregion dataProcessingAmount Prop


//#region paperAmount Prop
        @prop()
        paperAmount : number;
//#endregion paperAmount Prop





}