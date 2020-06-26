import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerFurnishedMaterialAvailableRuleBase {

//#region buyerFurnishedMaterialAvailableRuleId Prop
        @prop()
        buyerFurnishedMaterialAvailableRuleId : any;
//#endregion buyerFurnishedMaterialAvailableRuleId Prop


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


//#region eN_BuyerFurnishedMaterialAvailableRuleName Prop
        @required()
        @maxLength({value:500})
        eN_BuyerFurnishedMaterialAvailableRuleName : string;
//#endregion eN_BuyerFurnishedMaterialAvailableRuleName Prop


//#region fR_BuyerFurnishedMaterialAvailableRuleName Prop
        @maxLength({value:500})
        fR_BuyerFurnishedMaterialAvailableRuleName : string;
//#endregion fR_BuyerFurnishedMaterialAvailableRuleName Prop



}