import {ProjectBase} from '../database-models/project-base';
import {CreatedByNavigationBase} from '../database-models/created-by-navigation-base';
import {ProjectCustomFieldBase} from '../database-models/project-custom-field-base';
import {ProjectTaskBase} from '../database-models/project-task-base';
import {JobBase} from '../database-models/job-base';
//Generated Imports
export class Project extends ProjectBase 
{




//#region Generated Reference Properties
//#region createdByNavigation Prop
createdByNavigation : UserBase;
//#endregion createdByNavigation Prop
//#region projectCustomFields Prop
projectCustomFields : ProjectCustomFieldBase[];
//#endregion projectCustomFields Prop
//#region projectTasks Prop
projectTasks : ProjectTaskBase[];
//#endregion projectTasks Prop
//#region jobs Prop
jobs : JobBase[];
//#endregion jobs Prop

//#endregion Generated Reference Properties
}