import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CustomTextItemBase {

//#region customTextItemId Prop
        @prop()
        customTextItemId : number;
//#endregion customTextItemId Prop


//#region customTextItemName Prop
        @required()
        @maxLength({value:30})
        customTextItemName : string;
//#endregion customTextItemName Prop











}