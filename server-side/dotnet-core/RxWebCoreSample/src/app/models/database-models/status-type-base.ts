import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class StatusTypeBase {

//#region statusTypeId Prop
        @prop()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_StatusType Prop
        @maxLength({value:20})
        eN_StatusType : string;
//#endregion eN_StatusType Prop


//#region fR_StatusType Prop
        @maxLength({value:20})
        fR_StatusType : string;
//#endregion fR_StatusType Prop



}