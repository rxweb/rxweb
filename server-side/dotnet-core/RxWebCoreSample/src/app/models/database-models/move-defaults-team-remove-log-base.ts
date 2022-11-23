import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MoveDefaultsTeamRemoveLogBase {

//#region moveDefaultsTeamRemoveLogId Prop
        @prop()
        moveDefaultsTeamRemoveLogId : number;
//#endregion moveDefaultsTeamRemoveLogId Prop


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


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region teamRightId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        teamRightId : number;
//#endregion teamRightId Prop



}