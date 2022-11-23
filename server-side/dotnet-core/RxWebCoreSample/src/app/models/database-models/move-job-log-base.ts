import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MoveJobLogBase {

//#region moveJobLogId Prop
        @prop()
        moveJobLogId : number;
//#endregion moveJobLogId Prop


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


//#region oldDepartmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        oldDepartmentId : number;
//#endregion oldDepartmentId Prop


//#region newDepartmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        newDepartmentId : number;
//#endregion newDepartmentId Prop



}