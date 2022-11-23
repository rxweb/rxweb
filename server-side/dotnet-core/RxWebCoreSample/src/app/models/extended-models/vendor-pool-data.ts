import {VendorPoolDataBase} from '../database-models/vendor-pool-data-base';
import {BuyerBase} from '../database-models/buyer-base';
import {BuyerNavigationBase} from '../database-models/buyer-navigation-base';
import {VendorPoolBase} from '../database-models/vendor-pool-base';
import {VendorBase} from '../database-models/vendor-base';
import {VendorPoolDataStatuBase} from '../database-models/vendor-pool-data-statu-base';
//Generated Imports
export class VendorPoolData extends VendorPoolDataBase 
{




//#region Generated Reference Properties
//#region buyer Prop
buyer : BuyerBase;
//#endregion buyer Prop
//#region buyerNavigation Prop
buyerNavigation : BuyerVendorBase;
//#endregion buyerNavigation Prop
//#region vendorPool Prop
vendorPool : VendorPoolBase;
//#endregion vendorPool Prop
//#region vendor Prop
vendor : BuyerVendorBase;
//#endregion vendor Prop
//#region vendorPoolDataStatus Prop
vendorPoolDataStatus : VendorPoolDataStatusBase;
//#endregion vendorPoolDataStatus Prop

//#endregion Generated Reference Properties
}