import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerFurnishedMaterialDistributionTypeBase {

//#region buyerFurnishedMaterialDistributionTypeId Prop
        @prop()
        buyerFurnishedMaterialDistributionTypeId : any;
//#endregion buyerFurnishedMaterialDistributionTypeId Prop


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


//#region eN_BuyerFurnishedMaterialDistributionTypeName Prop
        @required()
        @maxLength({value:500})
        eN_BuyerFurnishedMaterialDistributionTypeName : string;
//#endregion eN_BuyerFurnishedMaterialDistributionTypeName Prop


//#region fR_BuyerFurnishedMaterialDistributionTypeName Prop
        @required()
        @maxLength({value:500})
        fR_BuyerFurnishedMaterialDistributionTypeName : string;
//#endregion fR_BuyerFurnishedMaterialDistributionTypeName Prop



}