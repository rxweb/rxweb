import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TopicVisibilityBase {

//#region topicVisibilityId Prop
        @prop()
        topicVisibilityId : any;
//#endregion topicVisibilityId Prop


//#region topicVisibilityName Prop
        @required()
        @maxLength({value:200})
        topicVisibilityName : string;
//#endregion topicVisibilityName Prop



}