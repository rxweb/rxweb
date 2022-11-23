import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerFurnishedMaterialCompositionBase {

//#region buyerFurnishedMaterialCompositionId Prop
        @prop()
        buyerFurnishedMaterialCompositionId : any;
//#endregion buyerFurnishedMaterialCompositionId Prop


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


//#region eN_BuyerFurnishedMaterialCompositionName Prop
        @required()
        eN_BuyerFurnishedMaterialCompositionName : string;
//#endregion eN_BuyerFurnishedMaterialCompositionName Prop


//#region fR_BuyerFurnishedMaterialCompositionName Prop
        @required()
        fR_BuyerFurnishedMaterialCompositionName : string;
//#endregion fR_BuyerFurnishedMaterialCompositionName Prop



}