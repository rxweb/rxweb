import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerFurnishedMaterialFormatBase {

//#region buyerFurnishedMaterialFormatId Prop
        @prop()
        buyerFurnishedMaterialFormatId : any;
//#endregion buyerFurnishedMaterialFormatId Prop


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


//#region eN_BuyerFurnishedMaterialFormatName Prop
        @required()
        @maxLength({value:500})
        eN_BuyerFurnishedMaterialFormatName : string;
//#endregion eN_BuyerFurnishedMaterialFormatName Prop


//#region fR_BuyerFurnishedMaterialFormatName Prop
        @required()
        @maxLength({value:500})
        fR_BuyerFurnishedMaterialFormatName : string;
//#endregion fR_BuyerFurnishedMaterialFormatName Prop



}