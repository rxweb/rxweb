import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ApplicationObjectBase {

//#region applicationObjectId Prop
        @prop()
        applicationObjectId : number;
//#endregion applicationObjectId Prop


//#region applicationObjectTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        applicationObjectTypeId : number;
//#endregion applicationObjectTypeId Prop


//#region applicationObjectName Prop
        @required()
        @maxLength({value:100})
        applicationObjectName : string;
//#endregion applicationObjectName Prop


//#region statusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusId : number;
//#endregion statusId Prop



}