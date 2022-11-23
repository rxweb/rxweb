import {ComponentCustomFieldBase} from '../database-models/component-custom-field-base';
import {ComponentBase} from '../database-models/component-base';
import {OwnerBase} from '../database-models/owner-base';
import {ComponentCustomFieldChildBase} from '../database-models/component-custom-field-child-base';
import {SpecItemCustomFieldBase} from '../database-models/spec-item-custom-field-base';
//Generated Imports
export class ComponentCustomField extends ComponentCustomFieldBase 
{




//#region Generated Reference Properties
//#region component Prop
component : ComponentBase;
//#endregion component Prop
//#region owner Prop
owner : UserBase;
//#endregion owner Prop
//#region componentCustomFieldChild Prop
componentCustomFieldChild : ComponentCustomFieldChildBase[];
//#endregion componentCustomFieldChild Prop
//#region specItemCustomFields Prop
specItemCustomFields : SpecItemCustomFieldBase[];
//#endregion specItemCustomFields Prop

//#endregion Generated Reference Properties
}