import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class HelptextIdBase {

//#region formName Prop
        @maxLength({value:40})
        formName : string;
//#endregion formName Prop


//#region fieldName Prop
        @maxLength({value:40})
        fieldName : string;
//#endregion fieldName Prop



}