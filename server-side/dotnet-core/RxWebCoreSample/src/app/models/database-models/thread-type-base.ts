import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ThreadTypeBase {

//#region threadTypeId Prop
        @prop()
        threadTypeId : any;
//#endregion threadTypeId Prop


//#region eN_ThreadType Prop
        @required()
        @maxLength({value:500})
        eN_ThreadType : string;
//#endregion eN_ThreadType Prop


//#region fR_ThreadType Prop
        @maxLength({value:500})
        fR_ThreadType : string;
//#endregion fR_ThreadType Prop



}