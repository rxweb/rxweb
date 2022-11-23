import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecMilestoneTaskBase {

//#region specMilestoneTaskId Prop
        @prop()
        specMilestoneTaskId : number;
//#endregion specMilestoneTaskId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region milestoneTaskId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        milestoneTaskId : number;
//#endregion milestoneTaskId Prop


//#region pendingMilestoneTaskId Prop
        @prop()
        pendingMilestoneTaskId : number;
//#endregion pendingMilestoneTaskId Prop


//#region specItemInitialStatusId Prop
        @required()
        specItemInitialStatusId : any;
//#endregion specItemInitialStatusId Prop


//#region specItemCurrentStatusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specItemCurrentStatusId : number;
//#endregion specItemCurrentStatusId Prop


//#region shared Prop
        @required()
        @maxLength({value:1})
        shared : string;
//#endregion shared Prop











}