import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AttachmentStatusBase {

//#region attachmentStatusId Prop
        @prop()
        attachmentStatusId : any;
//#endregion attachmentStatusId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_AttachmentStatusName Prop
        @required()
        @maxLength({value:500})
        eN_AttachmentStatusName : string;
//#endregion eN_AttachmentStatusName Prop


//#region fR_AttachmentStatusName Prop
        @required()
        @maxLength({value:500})
        fR_AttachmentStatusName : string;
//#endregion fR_AttachmentStatusName Prop

}