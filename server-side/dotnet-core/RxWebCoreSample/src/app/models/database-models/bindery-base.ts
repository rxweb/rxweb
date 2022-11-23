import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BinderyBase {

//#region binderyId Prop
        @prop()
        binderyId : any;
//#endregion binderyId Prop


//#region binderyName Prop
        @maxLength({value:50})
        binderyName : string;
//#endregion binderyName Prop


//#region legacyCode Prop
        @maxLength({value:3})
        legacyCode : string;
//#endregion legacyCode Prop





}