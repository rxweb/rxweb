import {VendorBase} from '../database-models/vendor-base';
import {AcquiredByUserBase} from '../database-models/acquired-by-user-base';
import {ElynxxSourcingStatuBase} from '../database-models/elynxx-sourcing-statu-base';
import {VendorDesignationBase} from '../database-models/vendor-designation-base';
import {VendorNavigationBase} from '../database-models/vendor-navigation-base';
import {VendorStatuBase} from '../database-models/vendor-statu-base';
import {BidSessionVendorBase} from '../database-models/bid-session-vendor-base';
import {BuyerVendorBase} from '../database-models/buyer-vendor-base';
import {VendorEquipmentBase} from '../database-models/vendor-equipment-base';
import {SampleEvaluationBase} from '../database-models/sample-evaluation-base';
import {VendorPoolDataBase} from '../database-models/vendor-pool-data-base';
import {ComponentEvaluationBase} from '../database-models/component-evaluation-base';
import {BuyerVendorComponentBase} from '../database-models/buyer-vendor-component-base';
import {VendorComponentBase} from '../database-models/vendor-component-base';
import {VendorBackgroundBase} from '../database-models/vendor-background-base';
import {SupportLogBase} from '../database-models/support-log-base';
import {VendorFileAttachmentBase} from '../database-models/vendor-file-attachment-base';
//Generated Imports
export class Vendor extends VendorBase 
{




//#region Generated Reference Properties
//#region acquiredByUser Prop
acquiredByUser : UserBase;
//#endregion acquiredByUser Prop
//#region elynxxSourcingStatus Prop
elynxxSourcingStatus : ElynxxSourcingStatusBase;
//#endregion elynxxSourcingStatus Prop
//#region vendorDesignation Prop
vendorDesignation : VendorDesignationBase;
//#endregion vendorDesignation Prop
//#region vendorNavigation Prop
vendorNavigation : UserBase;
//#endregion vendorNavigation Prop
//#region vendorStatus Prop
vendorStatus : VendorStatusBase;
//#endregion vendorStatus Prop
//#region bidSessionVendors Prop
bidSessionVendors : BidSessionVendorBase[];
//#endregion bidSessionVendors Prop
//#region buyerVendors Prop
buyerVendors : BuyerVendorBase[];
//#endregion buyerVendors Prop
//#region vendorEquipments Prop
vendorEquipments : VendorEquipmentBase[];
//#endregion vendorEquipments Prop
//#region sampleEvaluations Prop
sampleEvaluations : SampleEvaluationBase[];
//#endregion sampleEvaluations Prop
//#region vendorPoolData Prop
vendorPoolData : VendorPoolDataBase[];
//#endregion vendorPoolData Prop
//#region componentEvaluations Prop
componentEvaluations : ComponentEvaluationBase[];
//#endregion componentEvaluations Prop
//#region buyerVendorComponents Prop
buyerVendorComponents : BuyerVendorComponentBase[];
//#endregion buyerVendorComponents Prop
//#region vendorComponents Prop
vendorComponents : VendorComponentBase[];
//#endregion vendorComponents Prop
//#region vendorBackgrounds Prop
vendorBackgrounds : VendorBackgroundBase[];
//#endregion vendorBackgrounds Prop
//#region supportLogs Prop
supportLogs : SupportLogBase[];
//#endregion supportLogs Prop
//#region vendorFileAttachments Prop
vendorFileAttachments : VendorFileAttachmentBase[];
//#endregion vendorFileAttachments Prop

//#endregion Generated Reference Properties
}