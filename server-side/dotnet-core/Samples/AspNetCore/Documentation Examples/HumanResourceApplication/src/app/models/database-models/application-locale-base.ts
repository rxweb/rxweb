import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ApplicationLocaleBase {

//#region applicationLocaleId Prop
        @prop()
        applicationLocaleId : number;
//#endregion applicationLocaleId Prop


//#region localeCode Prop
        @required()
        @maxLength({value:50})
        localeCode : string;
//#endregion localeCode Prop


//#region localeName Prop
        @required()
        @maxLength({value:300})
        localeName : string;
//#endregion localeName Prop


//#region statusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusId : number;
//#endregion statusId Prop

}