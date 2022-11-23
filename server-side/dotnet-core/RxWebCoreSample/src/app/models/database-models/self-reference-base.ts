import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SelfReferenceBase {

//#region selfReferenceId Prop
        @prop()
        selfReferenceId : number;
//#endregion selfReferenceId Prop


//#region parentSelfReferenceId Prop
        @prop()
        parentSelfReferenceId : number;
//#endregion parentSelfReferenceId Prop


//#region secondSelfReferenceId Prop
        @prop()
        secondSelfReferenceId : number;
//#endregion secondSelfReferenceId Prop









}