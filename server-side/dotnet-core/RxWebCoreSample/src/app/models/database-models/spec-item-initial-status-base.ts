import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecItemInitialStatusBase {

//#region specItemInitialStatusId Prop
        @prop()
        specItemInitialStatusId : any;
//#endregion specItemInitialStatusId Prop


//#region eN_SpecItemInitialStatusName Prop
        @required()
        @maxLength({value:500})
        eN_SpecItemInitialStatusName : string;
//#endregion eN_SpecItemInitialStatusName Prop


//#region fR_SpecItemInitialStatusName Prop
        @maxLength({value:500})
        fR_SpecItemInitialStatusName : string;
//#endregion fR_SpecItemInitialStatusName Prop





















}