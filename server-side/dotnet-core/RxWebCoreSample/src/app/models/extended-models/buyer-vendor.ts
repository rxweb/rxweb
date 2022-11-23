import {BuyerVendorBase} from '../database-models/buyer-vendor-base';
import {BuyerBase} from '../database-models/buyer-base';
import {BuyerVendorStatuBase} from '../database-models/buyer-vendor-statu-base';
import {VendorBase} from '../database-models/vendor-base';
import {VendorDataItemBase} from '../database-models/vendor-data-item-base';
import {VendorPoolDataBase} from '../database-models/vendor-pool-data-base';
import {BuyerVendorComponentBase} from '../database-models/buyer-vendor-component-base';
import {BidderBase} from '../database-models/bidder-base';
//Generated Imports
export class BuyerVendor extends BuyerVendorBase 
{




//#region Generated Reference Properties
//#region buyer Prop
buyer : BuyerBase;
//#endregion buyer Prop
//#region buyerVendorStatus Prop
buyerVendorStatus : BuyerVendorStatusBase;
//#endregion buyerVendorStatus Prop
//#region vendor Prop
vendor : VendorBase;
//#endregion vendor Prop
//#region vendorDataItems Prop
vendorDataItems : VendorDataItemBase[];
//#endregion vendorDataItems Prop
//#region vendorPoolData Prop
vendorPoolData : VendorPoolDataBase[];
//#endregion vendorPoolData Prop
//#region buyerVendorComponents Prop
buyerVendorComponents : BuyerVendorComponentBase[];
//#endregion buyerVendorComponents Prop
//#region bidders Prop
bidders : BidderBase[];
//#endregion bidders Prop

//#endregion Generated Reference Properties
}