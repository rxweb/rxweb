import {EstimateSpecUnitBase} from '../database-models/estimate-spec-unit-base';
import {EstimateBase} from '../database-models/estimate-base';
import {SpecUnitBase} from '../database-models/spec-unit-base';
import {EstimateSpecUnitQtyBase} from '../database-models/estimate-spec-unit-qty-base';
import {EstimateVendorCommentBase} from '../database-models/estimate-vendor-comment-base';
//Generated Imports
export class EstimateSpecUnit extends EstimateSpecUnitBase 
{




//#region Generated Reference Properties
//#region estimate Prop
estimate : EstimateBase;
//#endregion estimate Prop
//#region specUnit Prop
specUnit : SpecUnitBase;
//#endregion specUnit Prop
//#region estimateSpecUnitQty Prop
estimateSpecUnitQty : EstimateSpecUnitQtyBase[];
//#endregion estimateSpecUnitQty Prop
//#region estimateVendorComments Prop
estimateVendorComments : EstimateVendorCommentBase[];
//#endregion estimateVendorComments Prop

//#endregion Generated Reference Properties
}