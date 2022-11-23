import {SetupRequestBase} from '../database-models/setup-request-base';
import {AgentBase} from '../database-models/agent-base';
import {BrandBase} from '../database-models/brand-base';
import {CloneCompBase} from '../database-models/clone-comp-base';
import {JobBase} from '../database-models/job-base';
import {ProductAgentBase} from '../database-models/product-agent-base';
import {ProviderDeptBase} from '../database-models/provider-dept-base';
import {ProviderJobBase} from '../database-models/provider-job-base';
import {RequestedByDeptBase} from '../database-models/requested-by-dept-base';
import {RequestedByUserBase} from '../database-models/requested-by-user-base';
import {RequestedUserBase} from '../database-models/requested-user-base';
import {ServiceBase} from '../database-models/service-base';
import {SetupRequestStatuBase} from '../database-models/setup-request-statu-base';
import {TimezoneBase} from '../database-models/timezone-base';
//Generated Imports
export class SetupRequest extends SetupRequestBase 
{




//#region Generated Reference Properties
//#region agent Prop
agent : UserBase;
//#endregion agent Prop
//#region brand Prop
brand : BrandBase;
//#endregion brand Prop
//#region cloneComp Prop
cloneComp : UserBase;
//#endregion cloneComp Prop
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region productAgent Prop
productAgent : UserBase;
//#endregion productAgent Prop
//#region providerDept Prop
providerDept : UserBase;
//#endregion providerDept Prop
//#region providerJob Prop
providerJob : JobBase;
//#endregion providerJob Prop
//#region requestedByDept Prop
requestedByDept : UserBase;
//#endregion requestedByDept Prop
//#region requestedByUser Prop
requestedByUser : UserBase;
//#endregion requestedByUser Prop
//#region requestedUser Prop
requestedUser : UserBase;
//#endregion requestedUser Prop
//#region service Prop
service : ServiceBase;
//#endregion service Prop
//#region setupRequestStatus Prop
setupRequestStatus : SetupRequestStatusBase;
//#endregion setupRequestStatus Prop
//#region timezone Prop
timezone : TimeZoneBase;
//#endregion timezone Prop

//#endregion Generated Reference Properties
}