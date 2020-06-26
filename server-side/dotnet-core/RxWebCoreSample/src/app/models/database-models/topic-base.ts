import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TopicBase {

//#region topicId Prop
        @prop()
        topicId : number;
//#endregion topicId Prop


//#region topicName Prop
        @required()
        @maxLength({value:200})
        topicName : string;
//#endregion topicName Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region topicVisibilityId Prop
        @required()
        topicVisibilityId : any;
//#endregion topicVisibilityId Prop


//#region createUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createUserId : number;
//#endregion createUserId Prop


//#region createLoginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createLoginId : number;
//#endregion createLoginId Prop


//#region createDate Prop
        @required()
        createDate : Date;
//#endregion createDate Prop



























}