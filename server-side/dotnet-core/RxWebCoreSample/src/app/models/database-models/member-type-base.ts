import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MemberTypeBase {

//#region memberTypeId Prop
        @required()
        memberTypeId : any;
//#endregion memberTypeId Prop


//#region memberTypeName Prop
        @maxLength({value:1})
        memberTypeName : string;
//#endregion memberTypeName Prop


//#region eN_MemberTypeDesc Prop
        @required()
        @maxLength({value:500})
        eN_MemberTypeDesc : string;
//#endregion eN_MemberTypeDesc Prop


//#region fR_MemberTypeDesc Prop
        @maxLength({value:500})
        fR_MemberTypeDesc : string;
//#endregion fR_MemberTypeDesc Prop



}