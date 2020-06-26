import {ComponentBase} from '../database-models/component-base';
import {ComponentGroupBase} from '../database-models/component-group-base';
import {ParentComponentBase} from '../database-models/parent-component-base';
import {ComponentCustomFieldBase} from '../database-models/component-custom-field-base';
import {ComponentEvaluationBase} from '../database-models/component-evaluation-base';
import {SpecItemBase} from '../database-models/spec-item-base';
import {BuyerComponentBase} from '../database-models/buyer-component-base';
import {VendorComponentBase} from '../database-models/vendor-component-base';
import {SampleEvaluationBase} from '../database-models/sample-evaluation-base';
import {ComponentQualityBase} from '../database-models/component-quality-base';
//Generated Imports
export class Component extends ComponentBase 
{




//#region Generated Reference Properties
//#region componentGroup Prop
componentGroup : ComponentGroupBase;
//#endregion componentGroup Prop
//#region parentComponent Prop
parentComponent : ComponentBase;
//#endregion parentComponent Prop
//#region componentCustomFields Prop
componentCustomFields : ComponentCustomFieldBase[];
//#endregion componentCustomFields Prop
//#region componentEvaluations Prop
componentEvaluations : ComponentEvaluationBase[];
//#endregion componentEvaluations Prop
//#region specItems Prop
specItems : SpecItemBase[];
//#endregion specItems Prop
//#region buyerComponents Prop
buyerComponents : BuyerComponentBase[];
//#endregion buyerComponents Prop
//#region vendorComponents Prop
vendorComponents : VendorComponentBase[];
//#endregion vendorComponents Prop
//#region sampleEvaluations Prop
sampleEvaluations : SampleEvaluationBase[];
//#endregion sampleEvaluations Prop
//#region componentQualities Prop
componentQualities : ComponentQualityBase[];
//#endregion componentQualities Prop
//#region components Prop
components : ComponentBase[];
//#endregion components Prop

//#endregion Generated Reference Properties
}