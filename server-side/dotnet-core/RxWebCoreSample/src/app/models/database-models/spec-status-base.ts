import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecStatusBase {

//#region specStatusId Prop
        @prop()
        specStatusId : any;
//#endregion specStatusId Prop


//#region eN_SpecStatusName Prop
        @required()
        @maxLength({value:500})
        eN_SpecStatusName : string;
//#endregion eN_SpecStatusName Prop


//#region fR_SpecStatusName Prop
        @maxLength({value:500})
        fR_SpecStatusName : string;
//#endregion fR_SpecStatusName Prop



}