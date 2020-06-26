import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TermSelectionStyleBase {

//#region termSelectionStyleId Prop
        @prop()
        termSelectionStyleId : any;
//#endregion termSelectionStyleId Prop


//#region eN_TermSelectionStyle Prop
        @required()
        @maxLength({value:500})
        eN_TermSelectionStyle : string;
//#endregion eN_TermSelectionStyle Prop


//#region fR_TermSelectionStyle Prop
        @maxLength({value:500})
        fR_TermSelectionStyle : string;
//#endregion fR_TermSelectionStyle Prop



}