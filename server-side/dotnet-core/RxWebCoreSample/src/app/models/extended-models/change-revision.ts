import {ChangeRevisionBase} from '../database-models/change-revision-base';
import {ChangeOrderBase} from '../database-models/change-order-base';
import {ChangeRevisionStatuBase} from '../database-models/change-revision-statu-base';
import {CreateJobStepBase} from '../database-models/create-job-step-base';
import {PriorChangeRevisionBase} from '../database-models/prior-change-revision-base';
import {SpecBase} from '../database-models/spec-base';
//Generated Imports
export class ChangeRevision extends ChangeRevisionBase 
{




//#region Generated Reference Properties
//#region changeOrder Prop
changeOrder : ChangeOrderBase;
//#endregion changeOrder Prop
//#region changeRevisionStatus Prop
changeRevisionStatus : ChangeRevisionStatusBase;
//#endregion changeRevisionStatus Prop
//#region createJobStep Prop
createJobStep : JobStepBase;
//#endregion createJobStep Prop
//#region priorChangeRevision Prop
priorChangeRevision : ChangeRevisionBase;
//#endregion priorChangeRevision Prop
//#region spec Prop
spec : SpecificationDetailBase;
//#endregion spec Prop
//#region changeRevisions Prop
changeRevisions : ChangeRevisionBase[];
//#endregion changeRevisions Prop

//#endregion Generated Reference Properties
}