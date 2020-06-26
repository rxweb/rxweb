import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecItemCurrentStatusBase {

//#region specItemCurrentStatusId Prop
        @prop()
        specItemCurrentStatusId : number;
//#endregion specItemCurrentStatusId Prop


//#region eN_SpecItemCurrentStatusName Prop
        @required()
        @maxLength({value:500})
        eN_SpecItemCurrentStatusName : string;
//#endregion eN_SpecItemCurrentStatusName Prop


//#region fR_SpecItemCurrentStatusName Prop
        @maxLength({value:500})
        fR_SpecItemCurrentStatusName : string;
//#endregion fR_SpecItemCurrentStatusName Prop





















}