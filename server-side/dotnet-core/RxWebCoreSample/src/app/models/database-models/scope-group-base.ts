import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ScopeGroupBase {

//#region scopeId Prop
        @prop()
        scopeId : any;
//#endregion scopeId Prop


//#region childScopeId Prop
        @prop()
        childScopeId : any;
//#endregion childScopeId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop





}