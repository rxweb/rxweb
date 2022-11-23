import {SpecMilestoneTaskBase} from '../database-models/spec-milestone-task-base';
import {MilestoneTaskBase} from '../database-models/milestone-task-base';
import {PendingMilestoneTaskBase} from '../database-models/pending-milestone-task-base';
import {SpecBase} from '../database-models/spec-base';
import {SpecItemCurrentStatuBase} from '../database-models/spec-item-current-statu-base';
import {SpecItemInitialStatuBase} from '../database-models/spec-item-initial-statu-base';
//Generated Imports
export class SpecMilestoneTask extends SpecMilestoneTaskBase 
{




//#region Generated Reference Properties
//#region milestoneTask Prop
milestoneTask : MilestoneTaskBase;
//#endregion milestoneTask Prop
//#region pendingMilestoneTask Prop
pendingMilestoneTask : MilestoneTaskBase;
//#endregion pendingMilestoneTask Prop
//#region spec Prop
spec : SpecificationDetailBase;
//#endregion spec Prop
//#region specItemCurrentStatus Prop
specItemCurrentStatus : SpecItemCurrentStatusBase;
//#endregion specItemCurrentStatus Prop
//#region specItemInitialStatus Prop
specItemInitialStatus : SpecItemInitialStatusBase;
//#endregion specItemInitialStatus Prop

//#endregion Generated Reference Properties
}