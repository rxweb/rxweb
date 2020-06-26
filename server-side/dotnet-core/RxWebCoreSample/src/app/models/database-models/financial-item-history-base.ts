import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FinancialItemHistoryBase {

//#region financialItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
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


//#region papperAmount Prop
        @prop()
        papperAmount : number;
//#endregion papperAmount Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @required()
        updatedDateTime : any;
//#endregion updatedDateTime Prop

}