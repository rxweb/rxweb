import {BrandBase} from '../database-models/brand-base';
import {BaseBrandBase} from '../database-models/base-brand-base';
import {UserBase} from '../database-models/user-base';
import {SetupRequestBase} from '../database-models/setup-request-base';
import {CustomTextBrandBase} from '../database-models/custom-text-brand-base';
//Generated Imports
export class Brand extends BrandBase 
{




//#region Generated Reference Properties
//#region baseBrand Prop
baseBrand : BrandBase;
//#endregion baseBrand Prop
//#region users Prop
users : UserBase[];
//#endregion users Prop
//#region setupRequests Prop
setupRequests : SetupRequestBase[];
//#endregion setupRequests Prop
//#region customTextBrands Prop
customTextBrands : CustomTextBrandBase[];
//#endregion customTextBrands Prop
//#region brands Prop
brands : BrandBase[];
//#endregion brands Prop

//#endregion Generated Reference Properties
}