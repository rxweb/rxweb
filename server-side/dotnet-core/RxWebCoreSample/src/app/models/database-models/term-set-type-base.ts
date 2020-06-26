import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TermSetTypeBase {

//#region termSetTypeId Prop
        @prop()
        termSetTypeId : any;
//#endregion termSetTypeId Prop


//#region eN_TermSetType Prop
        @required()
        @maxLength({value:500})
        eN_TermSetType : string;
//#endregion eN_TermSetType Prop


//#region fR_TermSetType Prop
        @maxLength({value:500})
        fR_TermSetType : string;
//#endregion fR_TermSetType Prop



}