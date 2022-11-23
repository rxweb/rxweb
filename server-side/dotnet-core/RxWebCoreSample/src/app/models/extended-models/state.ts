import {StateBase} from '../database-models/state-base';
import {CountryBase} from '../database-models/country-base';
import {SpecDestinationDetailBase} from '../database-models/spec-destination-detail-base';
import {AddressBase} from '../database-models/address-base';
import {VendorQualifierBase} from '../database-models/vendor-qualifier-base';
import {MemberPortfolioBase} from '../database-models/member-portfolio-base';
import {VendorBackgroundBase} from '../database-models/vendor-background-base';
//Generated Imports
export class State extends StateBase 
{




//#region Generated Reference Properties
//#region country Prop
country : CountryBase;
//#endregion country Prop
//#region specDestinationDetails Prop
specDestinationDetails : SpecDestinationDetailBase[];
//#endregion specDestinationDetails Prop
//#region addresses Prop
addresses : AddressBase[];
//#endregion addresses Prop
//#region vendorQualifiers Prop
vendorQualifiers : VendorQualifierBase[];
//#endregion vendorQualifiers Prop
//#region memberPortfolios Prop
memberPortfolios : MemberPortfolioBase[];
//#endregion memberPortfolios Prop
//#region vendorBackgrounds Prop
vendorBackgrounds : VendorBackgroundBase[];
//#endregion vendorBackgrounds Prop

//#endregion Generated Reference Properties
}