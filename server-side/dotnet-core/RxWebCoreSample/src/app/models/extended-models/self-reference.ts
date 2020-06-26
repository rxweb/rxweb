import {SelfReferenceBase} from '../database-models/self-reference-base';
import {ParentSelfReferenceBase} from '../database-models/parent-self-reference-base';
import {SecondSelfReferenceBase} from '../database-models/second-self-reference-base';
import {SelfReferencesSecondSelfReferenceBase} from '../database-models/self-references-second-self-reference-base';
//Generated Imports
export class SelfReference extends SelfReferenceBase 
{




//#region Generated Reference Properties
//#region parentSelfReference Prop
parentSelfReference : SelfReferenceBase;
//#endregion parentSelfReference Prop
//#region secondSelfReference Prop
secondSelfReference : SelfReferenceBase;
//#endregion secondSelfReference Prop
//#region selfReferences Prop
selfReferences : SelfReferenceBase[];
//#endregion selfReferences Prop
//#region selfReferencesSecondSelfReference Prop
selfReferencesSecondSelfReference : SelfReferenceBase[];
//#endregion selfReferencesSecondSelfReference Prop

//#endregion Generated Reference Properties
}