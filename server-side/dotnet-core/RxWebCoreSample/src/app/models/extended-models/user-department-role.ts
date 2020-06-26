import {UserDepartmentRoleBase} from '../database-models/user-department-role-base';
import {DepartmentBase} from '../database-models/department-base';
import {RoleCompanyMappingBase} from '../database-models/role-company-mapping-base';
import {RoleStatuBase} from '../database-models/role-statu-base';
import {UserBase} from '../database-models/user-base';
//Generated Imports
export class UserDepartmentRole extends UserDepartmentRoleBase 
{




//#region Generated Reference Properties
//#region department Prop
department : DepartmentServiceBase;
//#endregion department Prop
//#region roleCompanyMapping Prop
roleCompanyMapping : RoleCompanyMappingBase;
//#endregion roleCompanyMapping Prop
//#region roleStatus Prop
roleStatus : RoleStatusBase;
//#endregion roleStatus Prop
//#region user Prop
user : UserBase;
//#endregion user Prop

//#endregion Generated Reference Properties
}