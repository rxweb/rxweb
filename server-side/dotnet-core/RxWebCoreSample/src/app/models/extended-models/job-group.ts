import {JobGroupBase} from '../database-models/job-group-base';
import {ParentJobGroupBase} from '../database-models/parent-job-group-base';
import {JobTemplateBase} from '../database-models/job-template-base';
import {UserBase} from '../database-models/user-base';
//Generated Imports
export class JobGroup extends JobGroupBase 
{




//#region Generated Reference Properties
//#region parentJobGroup Prop
parentJobGroup : JobGroupBase;
//#endregion parentJobGroup Prop
//#region jobTemplates Prop
jobTemplates : JobTemplateBase[];
//#endregion jobTemplates Prop
//#region users Prop
users : UserBase[];
//#endregion users Prop
//#region jobGroups Prop
jobGroups : JobGroupBase[];
//#endregion jobGroups Prop

//#endregion Generated Reference Properties
}