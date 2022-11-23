import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SetupMemberSequenceStatusBase {

//#region setupMemberSequenceStatusId Prop
        @prop()
        setupMemberSequenceStatusId : any;
//#endregion setupMemberSequenceStatusId Prop


//#region eN_SetupMemberSequenceStatusName Prop
        @required()
        @maxLength({value:500})
        eN_SetupMemberSequenceStatusName : string;
//#endregion eN_SetupMemberSequenceStatusName Prop


//#region fR_SetupMemberSequenceStatusName Prop
        @required()
        @maxLength({value:500})
        fR_SetupMemberSequenceStatusName : string;
//#endregion fR_SetupMemberSequenceStatusName Prop



}