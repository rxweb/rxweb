import {MilestoneTaskBase} from '../database-models/milestone-task-base';
import {JobStepBase} from '../database-models/job-step-base';
import {SpecMilestoneTaskBase} from '../database-models/spec-milestone-task-base';
import {SpecMilestoneTasksPendingMilestoneTaskBase} from '../database-models/spec-milestone-tasks-pending-milestone-task-base';
import {MilestoneFileAttachmentBase} from '../database-models/milestone-file-attachment-base';
//Generated Imports
export class MilestoneTask extends MilestoneTaskBase 
{




//#region Generated Reference Properties
//#region jobStep Prop
jobStep : JobStepBase;
//#endregion jobStep Prop
//#region specMilestoneTasks Prop
specMilestoneTasks : SpecMilestoneTaskBase[];
//#endregion specMilestoneTasks Prop
//#region specMilestoneTasksPendingMilestoneTask Prop
specMilestoneTasksPendingMilestoneTask : SpecMilestoneTaskBase[];
//#endregion specMilestoneTasksPendingMilestoneTask Prop
//#region milestoneFileAttachments Prop
milestoneFileAttachments : MilestoneFileAttachmentBase[];
//#endregion milestoneFileAttachments Prop

//#endregion Generated Reference Properties
}