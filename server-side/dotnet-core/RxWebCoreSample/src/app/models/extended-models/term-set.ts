import {TermSetBase} from '../database-models/term-set-base';
import {JobBase} from '../database-models/job-base';
import {OwnerBase} from '../database-models/owner-base';
import {TermAcceptanceTypeBase} from '../database-models/term-acceptance-type-base';
import {TermSetTypeBase} from '../database-models/term-set-type-base';
import {VendorTermAcceptanceBase} from '../database-models/vendor-term-acceptance-base';
import {TermSetElementBase} from '../database-models/term-set-element-base';
import {BidTermSetBase} from '../database-models/bid-term-set-base';
import {EstimateTermSetBase} from '../database-models/estimate-term-set-base';
//Generated Imports
export class TermSet extends TermSetBase 
{




//#region Generated Reference Properties
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region owner Prop
owner : UserBase;
//#endregion owner Prop
//#region termAcceptanceType Prop
termAcceptanceType : TermAcceptanceTypeBase;
//#endregion termAcceptanceType Prop
//#region termSetType Prop
termSetType : TermSetTypeBase;
//#endregion termSetType Prop
//#region vendorTermAcceptances Prop
vendorTermAcceptances : VendorTermAcceptanceBase[];
//#endregion vendorTermAcceptances Prop
//#region termSetElements Prop
termSetElements : TermSetElementBase[];
//#endregion termSetElements Prop
//#region bidTermSets Prop
bidTermSets : BidTermSetBase[];
//#endregion bidTermSets Prop
//#region estimateTermSets Prop
estimateTermSets : EstimateTermSetBase[];
//#endregion estimateTermSets Prop

//#endregion Generated Reference Properties
}