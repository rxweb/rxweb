import {EventLogBase} from '../database-models/event-log-base';
import {EventBase} from '../database-models/event-base';
import {EventLoginBase} from '../database-models/event-login-base';
import {EventUserBase} from '../database-models/event-user-base';
import {JobBase} from '../database-models/job-base';
import {TargetUserBase} from '../database-models/target-user-base';
//Generated Imports
export class EventLog extends EventLogBase 
{




//#region Generated Reference Properties
//#region event Prop
event : EventBase;
//#endregion event Prop
//#region eventLogin Prop
eventLogin : UserBase;
//#endregion eventLogin Prop
//#region eventUser Prop
eventUser : UserBase;
//#endregion eventUser Prop
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region targetUser Prop
targetUser : UserBase;
//#endregion targetUser Prop

//#endregion Generated Reference Properties
}