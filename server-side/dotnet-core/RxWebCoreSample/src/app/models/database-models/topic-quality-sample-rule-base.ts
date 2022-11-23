import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TopicQualitySampleRuleBase {

//#region topicId Prop
        @prop()
        topicId : number;
//#endregion topicId Prop


//#region qualitySampleRuleId Prop
        @prop()
        qualitySampleRuleId : number;
//#endregion qualitySampleRuleId Prop



}