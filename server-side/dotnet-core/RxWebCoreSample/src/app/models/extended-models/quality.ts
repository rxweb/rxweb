import {QualityBase} from '../database-models/quality-base';
import {SampleEvaluationBase} from '../database-models/sample-evaluation-base';
import {ComponentQualityBase} from '../database-models/component-quality-base';
import {ComponentEvaluationBase} from '../database-models/component-evaluation-base';
import {SpecItemBase} from '../database-models/spec-item-base';
import {BuyerComponentBase} from '../database-models/buyer-component-base';
import {BuyerVendorComponentBase} from '../database-models/buyer-vendor-component-base';
//Generated Imports
export class Quality extends QualityBase 
{




//#region Generated Reference Properties
//#region sampleEvaluations Prop
sampleEvaluations : SampleEvaluationBase[];
//#endregion sampleEvaluations Prop
//#region componentQualities Prop
componentQualities : ComponentQualityBase[];
//#endregion componentQualities Prop
//#region componentEvaluations Prop
componentEvaluations : ComponentEvaluationBase[];
//#endregion componentEvaluations Prop
//#region specItems Prop
specItems : SpecItemBase[];
//#endregion specItems Prop
//#region buyerComponents Prop
buyerComponents : BuyerComponentBase[];
//#endregion buyerComponents Prop
//#region buyerVendorComponents Prop
buyerVendorComponents : BuyerVendorComponentBase[];
//#endregion buyerVendorComponents Prop

//#endregion Generated Reference Properties
}