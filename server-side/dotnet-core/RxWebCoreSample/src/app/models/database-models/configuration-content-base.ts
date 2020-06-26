import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ConfigurationContentBase {

//#region configurationContentId Prop
        @prop()
        configurationContentId : number;
//#endregion configurationContentId Prop


//#region configurationContentName Prop
        @required()
        configurationContentName : string;
//#endregion configurationContentName Prop


//#region en Prop
        @required()
        en : string;
//#endregion en Prop

}