import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ModuleContentBase {

//#region moduleContentId Prop
        @prop()
        moduleContentId : number;
//#endregion moduleContentId Prop


//#region applicationModuleId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        applicationModuleId : number;
//#endregion applicationModuleId Prop


//#region languageContentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        languageContentId : number;
//#endregion languageContentId Prop


//#region dataActionId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        dataActionId : number;
//#endregion dataActionId Prop


//#region en Prop
        @prop()
        en : string;
//#endregion en Prop

}