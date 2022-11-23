import {ChangeOrderBase} from '../database-models/change-order-base';
import {ChangeOrderStatuBase} from '../database-models/change-order-statu-base';
import {CreateUserBase} from '../database-models/create-user-base';
import {JobBase} from '../database-models/job-base';
import {JobThreadBase} from '../database-models/job-thread-base';
import {SpecBase} from '../database-models/spec-base';
import {ChangeRevisionBase} from '../database-models/change-revision-base';
//Generated Imports
export class ChangeOrder extends ChangeOrderBase 
{




//#region Generated Reference Properties
//#region changeOrderStatus Prop
changeOrderStatus : ChangeOrderStatusBase;
//#endregion changeOrderStatus Prop
//#region createUser Prop
createUser : UserBase;
//#endregion createUser Prop
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region jobThread Prop
jobThread : JobThreadBase;
//#endregion jobThread Prop
//#region spec Prop
spec : SpecificationDetailBase;
//#endregion spec Prop
//#region changeRevisions Prop
changeRevisions : ChangeRevisionBase[];
//#endregion changeRevisions Prop

//#endregion Generated Reference Properties
}