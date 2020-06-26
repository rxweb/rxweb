import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TopicProofBase {

//#region topicId Prop
        @prop()
        topicId : number;
//#endregion topicId Prop


//#region proofId Prop
        @prop()
        proofId : number;
//#endregion proofId Prop



}