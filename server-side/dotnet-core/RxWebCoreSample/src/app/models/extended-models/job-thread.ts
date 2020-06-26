import {JobThreadBase} from '../database-models/job-thread-base';
import {CurrentJobStepBase} from '../database-models/current-job-step-base';
import {FirstJobStepBase} from '../database-models/first-job-step-base';
import {JobBase} from '../database-models/job-base';
import {ThreadStatuBase} from '../database-models/thread-statu-base';
import {ThreadTypeBase} from '../database-models/thread-type-base';
import {ChangeOrderBase} from '../database-models/change-order-base';
import {JobStepBase} from '../database-models/job-step-base';
//Generated Imports
export class JobThread extends JobThreadBase 
{




//#region Generated Reference Properties
//#region currentJobStep Prop
currentJobStep : JobStepBase;
//#endregion currentJobStep Prop
//#region firstJobStep Prop
firstJobStep : JobStepBase;
//#endregion firstJobStep Prop
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region threadStatus Prop
threadStatus : ThreadStatusBase;
//#endregion threadStatus Prop
//#region threadType Prop
threadType : ThreadTypeBase;
//#endregion threadType Prop
//#region changeOrders Prop
changeOrders : ChangeOrderBase[];
//#endregion changeOrders Prop
//#region jobSteps Prop
jobSteps : JobStepBase[];
//#endregion jobSteps Prop

//#endregion Generated Reference Properties
}