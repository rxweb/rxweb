import {JobTeamBase} from '../database-models/job-team-base';
import {AssignedUserBase} from '../database-models/assigned-user-base';
import {JobBase} from '../database-models/job-base';
import {JobTeamStatuBase} from '../database-models/job-team-statu-base';
import {RoleCompanyMappingBase} from '../database-models/role-company-mapping-base';
import {ServiceBase} from '../database-models/service-base';
import {StepRightBase} from '../database-models/step-right-base';
//Generated Imports
export class JobTeam extends JobTeamBase 
{




//#region Generated Reference Properties
//#region assignedUser Prop
assignedUser : UserBase;
//#endregion assignedUser Prop
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region jobTeamStatus Prop
jobTeamStatus : JobTeamStatusBase;
//#endregion jobTeamStatus Prop
//#region roleCompanyMapping Prop
roleCompanyMapping : RoleCompanyMappingBase;
//#endregion roleCompanyMapping Prop
//#region service Prop
service : ServiceBase;
//#endregion service Prop
//#region stepRight Prop
stepRight : RightBase;
//#endregion stepRight Prop

//#endregion Generated Reference Properties
}