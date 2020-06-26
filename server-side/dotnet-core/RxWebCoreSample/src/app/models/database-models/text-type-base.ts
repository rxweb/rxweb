import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TextTypeBase {

//#region textTypeId Prop
        @prop()
        textTypeId : number;
//#endregion textTypeId Prop


//#region textTypeName Prop
        @maxLength({value:100})
        textTypeName : string;
//#endregion textTypeName Prop


//#region legacyCode Prop
        @maxLength({value:3})
        legacyCode : string;
//#endregion legacyCode Prop



}