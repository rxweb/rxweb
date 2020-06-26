import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CustomTextEmbeddedItemBase {

//#region customTextEmbeddedItemId Prop
        @prop()
        customTextEmbeddedItemId : number;
//#endregion customTextEmbeddedItemId Prop


//#region customTextItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        customTextItemId : number;
//#endregion customTextItemId Prop


//#region embeddedCustomTextItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        embeddedCustomTextItemId : number;
//#endregion embeddedCustomTextItemId Prop





}