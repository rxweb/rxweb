import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MoveResolutionBase {

//#region moveResolutionId Prop
        @prop()
        moveResolutionId : number;
//#endregion moveResolutionId Prop


//#region moveBatchId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        moveBatchId : number;
//#endregion moveBatchId Prop


//#region jobDepartmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobDepartmentId : number;
//#endregion jobDepartmentId Prop


//#region oldUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        oldUserId : number;
//#endregion oldUserId Prop


//#region jobRightId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobRightId : number;
//#endregion jobRightId Prop


//#region newUserId Prop
        @prop()
        newUserId : number;
//#endregion newUserId Prop


//#region useProxy Prop
        @prop()
        useProxy : number;
//#endregion useProxy Prop



}