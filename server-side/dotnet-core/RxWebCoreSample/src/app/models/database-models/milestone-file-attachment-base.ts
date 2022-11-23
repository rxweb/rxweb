import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MilestoneFileAttachmentBase {

//#region milestoneFileAttachmentId Prop
        @prop()
        milestoneFileAttachmentId : number;
//#endregion milestoneFileAttachmentId Prop


//#region jobFileAttachmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobFileAttachmentId : number;
//#endregion jobFileAttachmentId Prop


//#region milestoneTaskId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        milestoneTaskId : number;
//#endregion milestoneTaskId Prop





}