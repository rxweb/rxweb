import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MemberStatusBase {

//#region memberStatusId Prop
        @prop()
        memberStatusId : any;
//#endregion memberStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_MemberStatusName Prop
        @required()
        @maxLength({value:500})
        eN_MemberStatusName : string;
//#endregion eN_MemberStatusName Prop


//#region fR_MemberStatusName Prop
        @required()
        @maxLength({value:500})
        fR_MemberStatusName : string;
//#endregion fR_MemberStatusName Prop



}