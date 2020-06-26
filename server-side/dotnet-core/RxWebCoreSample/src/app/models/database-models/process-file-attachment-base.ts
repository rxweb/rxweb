import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProcessFileAttachmentBase {

//#region processFileAttachmentId Prop
        @prop()
        processFileAttachmentId : number;
//#endregion processFileAttachmentId Prop


//#region jobProcessId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobProcessId : number;
//#endregion jobProcessId Prop


//#region logicalFileId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        logicalFileId : number;
//#endregion logicalFileId Prop





}