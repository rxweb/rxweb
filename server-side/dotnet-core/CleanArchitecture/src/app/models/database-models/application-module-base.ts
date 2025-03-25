import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ApplicationModuleBase {

//#region applicationModuleId Prop
        @prop()
        applicationModuleId : number;
//#endregion applicationModuleId Prop


//#region moduleMasterId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        moduleMasterId : number;
//#endregion moduleMasterId Prop


//#region parentApplicationModuleId Prop
        @prop()
        parentApplicationModuleId : number;
//#endregion parentApplicationModuleId Prop





}