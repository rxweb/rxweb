import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DirectMailTypeBase {

//#region directMailTypeId Prop
        @prop()
        directMailTypeId : any;
//#endregion directMailTypeId Prop


//#region eN_DirectMailTypeName Prop
        @required()
        @maxLength({value:500})
        eN_DirectMailTypeName : string;
//#endregion eN_DirectMailTypeName Prop


//#region fR_DirectMailTypeName Prop
        @maxLength({value:500})
        fR_DirectMailTypeName : string;
//#endregion fR_DirectMailTypeName Prop

}