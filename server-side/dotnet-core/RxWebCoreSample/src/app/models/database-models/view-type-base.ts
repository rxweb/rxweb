import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ViewTypeBase {

//#region viewTypeId Prop
        @prop()
        viewTypeId : any;
//#endregion viewTypeId Prop


//#region viewTypeName Prop
        @required()
        @maxLength({value:100})
        viewTypeName : string;
//#endregion viewTypeName Prop

}