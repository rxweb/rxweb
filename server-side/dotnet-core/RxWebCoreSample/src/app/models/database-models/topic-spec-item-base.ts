import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TopicSpecItemBase {

//#region topicId Prop
        @prop()
        topicId : number;
//#endregion topicId Prop


//#region specItemId Prop
        @prop()
        specItemId : number;
//#endregion specItemId Prop





}