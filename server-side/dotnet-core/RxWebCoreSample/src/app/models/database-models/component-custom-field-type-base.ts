import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ComponentCustomFieldTypeBase {

//#region componentCustomFieldTypeId Prop
        @prop()
        componentCustomFieldTypeId : any;
//#endregion componentCustomFieldTypeId Prop


//#region componentCustomFieldTypeDescription Prop
        @required()
        @maxLength({value:200})
        componentCustomFieldTypeDescription : string;
//#endregion componentCustomFieldTypeDescription Prop

}