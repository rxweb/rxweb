import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ModuleMasterBase {

//#region moduleMasterId Prop
        @prop()
        moduleMasterId : number;
//#endregion moduleMasterId Prop


//#region moduleMasterName Prop
        @required()
        @maxLength({value:100})
        moduleMasterName : string;
//#endregion moduleMasterName Prop


//#region statusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusId : number;
//#endregion statusId Prop



}