import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TopicUOIBase {

//#region topicId Prop
        @prop()
        topicId : number;
//#endregion topicId Prop


//#region specUnitId Prop
        @prop()
        specUnitId : number;
//#endregion specUnitId Prop



}