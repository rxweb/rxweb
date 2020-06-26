import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecBuyerFurnishedMaterialBase {

//#region specBuyerFurnishedMaterialId Prop
        @prop()
        specBuyerFurnishedMaterialId : number;
//#endregion specBuyerFurnishedMaterialId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region buyerFurnishedMaterialId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerFurnishedMaterialId : number;
//#endregion buyerFurnishedMaterialId Prop


//#region pendingBuyerFurnishedMaterialId Prop
        @prop()
        pendingBuyerFurnishedMaterialId : number;
//#endregion pendingBuyerFurnishedMaterialId Prop


//#region specItemInitialStatusId Prop
        @required()
        specItemInitialStatusId : any;
//#endregion specItemInitialStatusId Prop


//#region specItemCurrentStatusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specItemCurrentStatusId : number;
//#endregion specItemCurrentStatusId Prop


//#region shared Prop
        @required()
        @maxLength({value:1})
        shared : string;
//#endregion shared Prop











}