import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TermAcceptanceTypeBase {

//#region termAcceptanceTypeId Prop
        @prop()
        termAcceptanceTypeId : any;
//#endregion termAcceptanceTypeId Prop


//#region eN_TermAcceptanceType Prop
        @required()
        @maxLength({value:500})
        eN_TermAcceptanceType : string;
//#endregion eN_TermAcceptanceType Prop


//#region fR_TermAcceptanceType Prop
        @maxLength({value:500})
        fR_TermAcceptanceType : string;
//#endregion fR_TermAcceptanceType Prop



}