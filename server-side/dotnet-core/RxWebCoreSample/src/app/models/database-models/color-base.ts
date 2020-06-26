import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ColorBase {

//#region colorId Prop
        @prop()
        colorId : number;
//#endregion colorId Prop


//#region colorName Prop
        @maxLength({value:50})
        colorName : string;
//#endregion colorName Prop


//#region legacyCode Prop
        @maxLength({value:3})
        legacyCode : string;
//#endregion legacyCode Prop









}