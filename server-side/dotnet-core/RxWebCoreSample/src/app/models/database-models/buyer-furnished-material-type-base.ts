import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerFurnishedMaterialTypeBase {

//#region buyerFurnishedMaterialTypeId Prop
        @prop()
        buyerFurnishedMaterialTypeId : any;
//#endregion buyerFurnishedMaterialTypeId Prop


//#region statusTypeId Prop
        @prop()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop


//#region eN_BuyerFurnishedMaterialTypeName Prop
        @required()
        @maxLength({value:500})
        eN_BuyerFurnishedMaterialTypeName : string;
//#endregion eN_BuyerFurnishedMaterialTypeName Prop


//#region fR_BuyerFurnishedMaterialTypeName Prop
        @required()
        @maxLength({value:500})
        fR_BuyerFurnishedMaterialTypeName : string;
//#endregion fR_BuyerFurnishedMaterialTypeName Prop



}