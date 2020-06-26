import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ScopeBase {

//#region scopeId Prop
        @prop()
        scopeId : any;
//#endregion scopeId Prop


//#region scopeName Prop
        @required()
        @maxLength({value:255})
        scopeName : string;
//#endregion scopeName Prop







}