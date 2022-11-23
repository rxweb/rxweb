import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ElectronicDataInterchangeBatchBase {

//#region electronicDataInterchangeBatchId Prop
        @prop()
        electronicDataInterchangeBatchId : number;
//#endregion electronicDataInterchangeBatchId Prop


//#region batchDate Prop
        @required()
        batchDate : Date;
//#endregion batchDate Prop


//#region electronicDataInterchangeBatchStatusId Prop
        @required()
        electronicDataInterchangeBatchStatusId : any;
//#endregion electronicDataInterchangeBatchStatusId Prop





}