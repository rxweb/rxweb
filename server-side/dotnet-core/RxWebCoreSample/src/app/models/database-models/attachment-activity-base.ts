import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AttachmentActivityBase {

//#region attachmentActivityId Prop
        @prop()
        attachmentActivityId : number;
//#endregion attachmentActivityId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_AttachmentActivityName Prop
        @required()
        @maxLength({value:500})
        eN_AttachmentActivityName : string;
//#endregion eN_AttachmentActivityName Prop


//#region fR_AttachmentActivityName Prop
        @required()
        @maxLength({value:500})
        fR_AttachmentActivityName : string;
//#endregion fR_AttachmentActivityName Prop

}