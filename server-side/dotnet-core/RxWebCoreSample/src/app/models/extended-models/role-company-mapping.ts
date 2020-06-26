import {RoleCompanyMappingBase} from '../database-models/role-company-mapping-base';
import {RoleBase} from '../database-models/role-base';
import {RoleAbilityBase} from '../database-models/role-ability-base';
import {JobStepBase} from '../database-models/job-step-base';
import {UserDepartmentRoleBase} from '../database-models/user-department-role-base';
import {JobTeamBase} from '../database-models/job-team-base';
import {VendorAssignedTeamMemberBase} from '../database-models/vendor-assigned-team-member-base';
import {VendorTeamMemberBase} from '../database-models/vendor-team-member-base';
//Generated Imports
export class RoleCompanyMapping extends RoleCompanyMappingBase 
{




//#region Generated Reference Properties
//#region role Prop
role : RoleBase;
//#endregion role Prop
//#region roleAbilities Prop
roleAbilities : RoleAbilityBase[];
//#endregion roleAbilities Prop
//#region jobSteps Prop
jobSteps : JobStepBase[];
//#endregion jobSteps Prop
//#region userDepartmentRoles Prop
userDepartmentRoles : UserDepartmentRoleBase[];
//#endregion userDepartmentRoles Prop
//#region jobTeams Prop
jobTeams : JobTeamBase[];
//#endregion jobTeams Prop
//#region vendorAssignedTeamMembers Prop
vendorAssignedTeamMembers : VendorAssignedTeamMemberBase[];
//#endregion vendorAssignedTeamMembers Prop
//#region vendorTeamMembers Prop
vendorTeamMembers : VendorTeamMemberBase[];
//#endregion vendorTeamMembers Prop

//#endregion Generated Reference Properties
}