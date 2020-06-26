import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CustomTextNlsLanguageBase {

//#region customTextId Prop
        @prop()
        customTextId : number;
//#endregion customTextId Prop


//#region nlsLang Prop
        @maxLength({value:100})
        nlsLang : string;
//#endregion nlsLang Prop


//#region customText Prop
        @prop()
        customText : string;
//#endregion customText Prop

}