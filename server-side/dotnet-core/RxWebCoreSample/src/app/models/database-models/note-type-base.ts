import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class NoteTypeBase {

//#region noteTypeId Prop
        @prop()
        noteTypeId : any;
//#endregion noteTypeId Prop


//#region eN_NoteTypeName Prop
        @required()
        @maxLength({value:500})
        eN_NoteTypeName : string;
//#endregion eN_NoteTypeName Prop


//#region fR_NoteTypeName Prop
        @maxLength({value:500})
        fR_NoteTypeName : string;
//#endregion fR_NoteTypeName Prop





}