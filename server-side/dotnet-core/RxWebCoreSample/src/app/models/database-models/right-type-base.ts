import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RightTypeBase {

//#region rightTypeId Prop
        @prop()
        rightTypeId : any;
//#endregion rightTypeId Prop


//#region eN_RightTypeName Prop
        @required()
        @maxLength({value:500})
        eN_RightTypeName : string;
//#endregion eN_RightTypeName Prop


//#region fR_RightTypeName Prop
        @required()
        @maxLength({value:500})
        fR_RightTypeName : string;
//#endregion fR_RightTypeName Prop



}