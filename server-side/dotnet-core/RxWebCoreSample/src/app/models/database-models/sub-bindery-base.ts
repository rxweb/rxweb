import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SubBinderyBase {

//#region subBinderyId Prop
        @prop()
        subBinderyId : number;
//#endregion subBinderyId Prop


//#region subBinderyName Prop
        @maxLength({value:50})
        subBinderyName : string;
//#endregion subBinderyName Prop


//#region legacyCode Prop
        @maxLength({value:3})
        legacyCode : string;
//#endregion legacyCode Prop





}