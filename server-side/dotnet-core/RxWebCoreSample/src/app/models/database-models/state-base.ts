import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class StateBase {

//#region stateId Prop
        @prop()
        stateId : any;
//#endregion stateId Prop


//#region countryId Prop
        @required()
        countryId : any;
//#endregion countryId Prop


//#region eN_States Prop
        @maxLength({value:500})
        eN_States : string;
//#endregion eN_States Prop


//#region eN_ShortStateName Prop
        @maxLength({value:500})
        eN_ShortStateName : string;
//#endregion eN_ShortStateName Prop


//#region fR_States Prop
        @maxLength({value:500})
        fR_States : string;
//#endregion fR_States Prop


//#region fR_ShortStateName Prop
        @maxLength({value:500})
        fR_ShortStateName : string;
//#endregion fR_ShortStateName Prop













}