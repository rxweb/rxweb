import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CoverTypeBase {

//#region coverTypeId Prop
        @prop()
        coverTypeId : number;
//#endregion coverTypeId Prop


//#region coverTypeName Prop
        @maxLength({value:50})
        coverTypeName : string;
//#endregion coverTypeName Prop


//#region legacyCode Prop
        @maxLength({value:3})
        legacyCode : string;
//#endregion legacyCode Prop





}