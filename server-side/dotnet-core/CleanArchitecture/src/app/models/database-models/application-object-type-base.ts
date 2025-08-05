import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ApplicationObjectTypeBase {

//#region applicationObjectTypeId Prop
        @prop()
        applicationObjectTypeId : number;
//#endregion applicationObjectTypeId Prop


//#region applicationObjectTypeName Prop
        @required()
        @maxLength({value:100})
        applicationObjectTypeName : string;
//#endregion applicationObjectTypeName Prop


//#region statusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusId : number;
//#endregion statusId Prop



}