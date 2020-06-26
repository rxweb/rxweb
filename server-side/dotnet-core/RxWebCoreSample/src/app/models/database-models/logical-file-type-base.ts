import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LogicalFileTypeBase {

//#region logicalFileTypeId Prop
        @prop()
        logicalFileTypeId : any;
//#endregion logicalFileTypeId Prop


//#region accessRightId Prop
        @prop()
        accessRightId : number;
//#endregion accessRightId Prop


//#region editRightId Prop
        @prop()
        editRightId : number;
//#endregion editRightId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_LogicalFileTypeName Prop
        @required()
        @maxLength({value:500})
        eN_LogicalFileTypeName : string;
//#endregion eN_LogicalFileTypeName Prop


//#region fR_LogicalFileTypeName Prop
        @maxLength({value:500})
        fR_LogicalFileTypeName : string;
//#endregion fR_LogicalFileTypeName Prop







}