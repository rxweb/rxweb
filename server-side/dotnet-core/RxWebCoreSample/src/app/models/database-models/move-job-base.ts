import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MoveJobBase {

//#region moveJobId Prop
        @prop()
        moveJobId : number;
//#endregion moveJobId Prop


//#region moveBatchId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        moveBatchId : number;
//#endregion moveBatchId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region newDepartmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        newDepartmentId : number;
//#endregion newDepartmentId Prop



}