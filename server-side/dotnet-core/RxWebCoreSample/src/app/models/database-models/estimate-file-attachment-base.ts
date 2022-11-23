import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateFileAttachmentBase {

//#region estimateFileAttachmentId Prop
        @prop()
        estimateFileAttachmentId : number;
//#endregion estimateFileAttachmentId Prop


//#region estimateVendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        estimateVendorId : number;
//#endregion estimateVendorId Prop


//#region logicalFileId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        logicalFileId : number;
//#endregion logicalFileId Prop





}