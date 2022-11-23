import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MoveJobTeamReassignLogBase {

//#region moveJobTeamReassignLogId Prop
        @prop()
        moveJobTeamReassignLogId : number;
//#endregion moveJobTeamReassignLogId Prop


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


//#region teamRightId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        teamRightId : number;
//#endregion teamRightId Prop


//#region oldUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        oldUserId : number;
//#endregion oldUserId Prop


//#region newUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        newUserId : number;
//#endregion newUserId Prop



}