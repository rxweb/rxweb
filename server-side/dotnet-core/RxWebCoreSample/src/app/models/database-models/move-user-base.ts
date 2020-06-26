import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MoveUserBase {

//#region moveUserId Prop
        @prop()
        moveUserId : number;
//#endregion moveUserId Prop


//#region moveBatchId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        moveBatchId : number;
//#endregion moveBatchId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region newParentId Prop
        @prop()
        newParentId : number;
//#endregion newParentId Prop


//#region moveActiveJobs Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        moveActiveJobs : number;
//#endregion moveActiveJobs Prop


//#region moveCompleteJobs Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        moveCompleteJobs : number;
//#endregion moveCompleteJobs Prop



}