import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class StockTypeBase {

//#region stockTypeId Prop
        @prop()
        stockTypeId : any;
//#endregion stockTypeId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_StockTypeName Prop
        @required()
        @maxLength({value:500})
        eN_StockTypeName : string;
//#endregion eN_StockTypeName Prop


//#region fR_StockTypeName Prop
        @maxLength({value:500})
        fR_StockTypeName : string;
//#endregion fR_StockTypeName Prop



}