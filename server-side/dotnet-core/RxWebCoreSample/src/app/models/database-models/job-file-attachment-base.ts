import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobFileAttachmentBase {

//#region jobFileAttachmentId Prop
        @prop()
        jobFileAttachmentId : number;
//#endregion jobFileAttachmentId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region logicalFileId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        logicalFileId : number;
//#endregion logicalFileId Prop

















}