import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SurfaceBase {

//#region surfaceId Prop
        @prop()
        surfaceId : number;
//#endregion surfaceId Prop


//#region surfaceName Prop
        @required()
        @maxLength({value:100})
        surfaceName : string;
//#endregion surfaceName Prop


//#region legacyCode Prop
        @maxLength({value:3})
        legacyCode : string;
//#endregion legacyCode Prop









}