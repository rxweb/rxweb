import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobPricingBase {

//#region jobPricingId Prop
        @prop()
        jobPricingId : number;
//#endregion jobPricingId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop


//#region htmlId Prop
        @prop()
        htmlId : number;
//#endregion htmlId Prop


//#region retailPrice Prop
        @prop()
        retailPrice : number;
//#endregion retailPrice Prop


//#region adjustedRetailPrice Prop
        @prop()
        adjustedRetailPrice : number;
//#endregion adjustedRetailPrice Prop


//#region finalRetailPrice Prop
        @prop()
        finalRetailPrice : number;
//#endregion finalRetailPrice Prop


//#region projectedProductionCost Prop
        @prop()
        projectedProductionCost : number;
//#endregion projectedProductionCost Prop


//#region projectedShippingCost Prop
        @prop()
        projectedShippingCost : number;
//#endregion projectedShippingCost Prop


//#region actualProductionCost Prop
        @prop()
        actualProductionCost : number;
//#endregion actualProductionCost Prop


//#region floorPrice Prop
        @prop()
        floorPrice : number;
//#endregion floorPrice Prop


//#region pricingUserName Prop
        @maxLength({value:200})
        pricingUserName : string;
//#endregion pricingUserName Prop


//#region pricingComment Prop
        @maxLength({value:4000})
        pricingComment : string;
//#endregion pricingComment Prop


//#region adjustmentUserName Prop
        @maxLength({value:200})
        adjustmentUserName : string;
//#endregion adjustmentUserName Prop


//#region adjustmentComment Prop
        @maxLength({value:4000})
        adjustmentComment : string;
//#endregion adjustmentComment Prop







}