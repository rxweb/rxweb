import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ElectronicDataInterchangeBatchStatusBase {

//#region electronicDataInterchangeBatchStatusId Prop
        @prop()
        electronicDataInterchangeBatchStatusId : any;
//#endregion electronicDataInterchangeBatchStatusId Prop


//#region electronicDataInterchangeBatchStatusName Prop
        @maxLength({value:100})
        electronicDataInterchangeBatchStatusName : string;
//#endregion electronicDataInterchangeBatchStatusName Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop



}