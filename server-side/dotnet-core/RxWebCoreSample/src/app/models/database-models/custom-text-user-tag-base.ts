import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CustomTextUserTagBase {

//#region customTextUserTagId Prop
        @prop()
        customTextUserTagId : number;
//#endregion customTextUserTagId Prop


//#region customTextUserTagName Prop
        @required()
        @maxLength({value:30})
        customTextUserTagName : string;
//#endregion customTextUserTagName Prop


//#region customTextItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        customTextItemId : number;
//#endregion customTextItemId Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop



}