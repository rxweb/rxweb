import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SetupMemberStatusBase {

//#region setupMemberStatusId Prop
        @prop()
        setupMemberStatusId : any;
//#endregion setupMemberStatusId Prop


//#region eN_SetupMemberStatusName Prop
        @required()
        @maxLength({value:500})
        eN_SetupMemberStatusName : string;
//#endregion eN_SetupMemberStatusName Prop


//#region fR_SetupMemberStatusName Prop
        @required()
        @maxLength({value:500})
        fR_SetupMemberStatusName : string;
//#endregion fR_SetupMemberStatusName Prop



}