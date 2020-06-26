import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProofFileAttachmentBase {

//#region proofFileAttachmentId Prop
        @prop()
        proofFileAttachmentId : number;
//#endregion proofFileAttachmentId Prop


//#region jobFileAttachmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobFileAttachmentId : number;
//#endregion jobFileAttachmentId Prop


//#region proofId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        proofId : number;
//#endregion proofId Prop





}