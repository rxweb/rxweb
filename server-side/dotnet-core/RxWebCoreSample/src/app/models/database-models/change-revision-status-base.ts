import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ChangeRevisionStatusBase {

//#region changeRevisionStatusId Prop
        @prop()
        changeRevisionStatusId : any;
//#endregion changeRevisionStatusId Prop


//#region eN_ChangeRevisionStatusName Prop
        @required()
        @maxLength({value:500})
        eN_ChangeRevisionStatusName : string;
//#endregion eN_ChangeRevisionStatusName Prop


//#region fR_ChangeRevisionStatusName Prop
        @maxLength({value:500})
        fR_ChangeRevisionStatusName : string;
//#endregion fR_ChangeRevisionStatusName Prop



}