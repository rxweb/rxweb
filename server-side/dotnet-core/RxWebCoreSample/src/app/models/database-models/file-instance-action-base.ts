import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FileInstanceActionBase {

//#region fileInstanceActionId Prop
        @prop()
        fileInstanceActionId : any;
//#endregion fileInstanceActionId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_FileInstanceActionName Prop
        @required()
        @maxLength({value:500})
        eN_FileInstanceActionName : string;
//#endregion eN_FileInstanceActionName Prop


//#region fR_FileInstanceActionName Prop
        @required()
        @maxLength({value:500})
        fR_FileInstanceActionName : string;
//#endregion fR_FileInstanceActionName Prop



}