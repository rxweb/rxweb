import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerFurnishedMaterialPreparationTypeBase {

//#region buyerFurnishedMaterialPreparationTypeId Prop
        @prop()
        buyerFurnishedMaterialPreparationTypeId : any;
//#endregion buyerFurnishedMaterialPreparationTypeId Prop


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


//#region eN_BuyerFurnishedMaterialPreparationTypeName Prop
        @required()
        @maxLength({value:500})
        eN_BuyerFurnishedMaterialPreparationTypeName : string;
//#endregion eN_BuyerFurnishedMaterialPreparationTypeName Prop


//#region fR_BuyerFurnishedMaterialPreparationTypeName Prop
        @required()
        @maxLength({value:500})
        fR_BuyerFurnishedMaterialPreparationTypeName : string;
//#endregion fR_BuyerFurnishedMaterialPreparationTypeName Prop



}