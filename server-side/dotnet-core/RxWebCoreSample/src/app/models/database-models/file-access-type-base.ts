import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FileAccessTypeBase {

//#region fileAccessTypeId Prop
        @prop()
        fileAccessTypeId : any;
//#endregion fileAccessTypeId Prop


//#region logicalFileTypeId Prop
        @required()
        logicalFileTypeId : any;
//#endregion logicalFileTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_FileAccessTypeName Prop
        @required()
        @maxLength({value:500})
        eN_FileAccessTypeName : string;
//#endregion eN_FileAccessTypeName Prop


//#region eN_FileAccessBriefTypeName Prop
        @required()
        @maxLength({value:500})
        eN_FileAccessBriefTypeName : string;
//#endregion eN_FileAccessBriefTypeName Prop


//#region fR_FileAccessTypeName Prop
        @required()
        @maxLength({value:500})
        fR_FileAccessTypeName : string;
//#endregion fR_FileAccessTypeName Prop


//#region fR_FileAccessBriefTypeName Prop
        @required()
        @maxLength({value:500})
        fR_FileAccessBriefTypeName : string;
//#endregion fR_FileAccessBriefTypeName Prop



}