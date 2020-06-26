import {GPMUserBase} from '../database-models/g-p-m-user-base';
import {CompanyBase} from '../database-models/company-base';
import {UserStatuBase} from '../database-models/user-statu-base';
import {EmailBase} from '../database-models/email-base';
//Generated Imports
export class GPMUser extends GPMUserBase 
{




//#region Generated Reference Properties
//#region company Prop
company : CompanyBase;
//#endregion company Prop
//#region userStatus Prop
userStatus : UserStatusBase;
//#endregion userStatus Prop
//#region emails Prop
emails : EmailBase[];
//#endregion emails Prop

//#endregion Generated Reference Properties
}