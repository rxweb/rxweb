import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobStepFileAttachmentBase {

//#region jobStepFileAttachmentId Prop
        @prop()
        jobStepFileAttachmentId : number;
//#endregion jobStepFileAttachmentId Prop


//#region jobFileAttachmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobFileAttachmentId : number;
//#endregion jobFileAttachmentId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop





}