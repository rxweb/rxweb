import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MaterialBase {

//#region materialId Prop
        @prop()
        materialId : number;
//#endregion materialId Prop


//#region materialName Prop
        @maxLength({value:50})
        materialName : string;
//#endregion materialName Prop


//#region legacyCode Prop
        @maxLength({value:3})
        legacyCode : string;
//#endregion legacyCode Prop





}