import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TopicMilestoneBase {

//#region topicId Prop
        @prop()
        topicId : number;
//#endregion topicId Prop


//#region milestoneTaskId Prop
        @prop()
        milestoneTaskId : number;
//#endregion milestoneTaskId Prop



}