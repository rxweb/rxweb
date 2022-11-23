import {EstimateVendorBase} from '../database-models/estimate-vendor-base';
import {EstimateBase} from '../database-models/estimate-base';
import {EstimateStatuBase} from '../database-models/estimate-statu-base';
import {EstimateFileAttachmentBase} from '../database-models/estimate-file-attachment-base';
import {EstimateVendorCommentBase} from '../database-models/estimate-vendor-comment-base';
import {EstimateVendorPriceBase} from '../database-models/estimate-vendor-price-base';
//Generated Imports
export class EstimateVendor extends EstimateVendorBase 
{




//#region Generated Reference Properties
//#region estimate Prop
estimate : EstimateBase;
//#endregion estimate Prop
//#region estimateStatus Prop
estimateStatus : EstimateStatusBase;
//#endregion estimateStatus Prop
//#region estimateFileAttachments Prop
estimateFileAttachments : EstimateFileAttachmentBase[];
//#endregion estimateFileAttachments Prop
//#region estimateVendorComments Prop
estimateVendorComments : EstimateVendorCommentBase[];
//#endregion estimateVendorComments Prop
//#region estimateVendorPrices Prop
estimateVendorPrices : EstimateVendorPriceBase[];
//#endregion estimateVendorPrices Prop

//#endregion Generated Reference Properties
}