import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerFurnishedMaterialReturnTypeBase {

//#region buyerFurnishedMaterialReturnTypeId Prop
        @prop()
        buyerFurnishedMaterialReturnTypeId : any;
//#endregion buyerFurnishedMaterialReturnTypeId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        displayOrder : number;
//#endregion displayOrder Prop


//#region eN_BuyerFurnishedMaterialReturnTypeName Prop
        @required()
        @maxLength({value:500})
        eN_BuyerFurnishedMaterialReturnTypeName : string;
//#endregion eN_BuyerFurnishedMaterialReturnTypeName Prop


//#region fR_BuyerFurnishedMaterialReturnTypeName Prop
        @required()
        @maxLength({value:500})
        fR_BuyerFurnishedMaterialReturnTypeName : string;
//#endregion fR_BuyerFurnishedMaterialReturnTypeName Prop



}