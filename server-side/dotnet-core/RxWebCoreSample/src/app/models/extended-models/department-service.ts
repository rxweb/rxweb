import {DepartmentServiceBase} from '../database-models/department-service-base';
import {AgentBase} from '../database-models/agent-base';
import {ContractStatuBase} from '../database-models/contract-statu-base';
import {ProviderAgentBase} from '../database-models/provider-agent-base';
import {ProviderDepartmentBase} from '../database-models/provider-department-base';
import {ServiceBase} from '../database-models/service-base';
import {ServiceStatuBase} from '../database-models/service-statu-base';
import {UserDepartmentRoleBase} from '../database-models/user-department-role-base';
//Generated Imports
export class DepartmentService extends DepartmentServiceBase 
{




//#region Generated Reference Properties
//#region agent Prop
agent : UserBase;
//#endregion agent Prop
//#region contractStatus Prop
contractStatus : ContractStatusBase;
//#endregion contractStatus Prop
//#region providerAgent Prop
providerAgent : UserBase;
//#endregion providerAgent Prop
//#region providerDepartment Prop
providerDepartment : UserBase;
//#endregion providerDepartment Prop
//#region service Prop
service : ServiceBase;
//#endregion service Prop
//#region serviceStatus Prop
serviceStatus : ServiceStatusBase;
//#endregion serviceStatus Prop
//#region userDepartmentRoles Prop
userDepartmentRoles : UserDepartmentRoleBase[];
//#endregion userDepartmentRoles Prop

//#endregion Generated Reference Properties
}