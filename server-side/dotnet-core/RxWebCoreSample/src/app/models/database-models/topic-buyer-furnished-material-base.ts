import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TopicBuyerFurnishedMaterialBase {

//#region topicId Prop
        @prop()
        topicId : number;
//#endregion topicId Prop


//#region buyerFurnishedMaterialId Prop
        @prop()
        buyerFurnishedMaterialId : number;
//#endregion buyerFurnishedMaterialId Prop



}