import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ImageTypeBase {

//#region imageTypeId Prop
        @prop()
        imageTypeId : any;
//#endregion imageTypeId Prop


//#region imageTypeName Prop
        @maxLength({value:50})
        imageTypeName : string;
//#endregion imageTypeName Prop

}