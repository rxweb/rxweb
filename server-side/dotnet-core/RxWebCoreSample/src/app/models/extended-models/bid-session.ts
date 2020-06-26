import {BidSessionBase} from '../database-models/bid-session-base';
import {AwardedJobStepBase} from '../database-models/awarded-job-step-base';
import {AwardOffsetUnitBase} from '../database-models/award-offset-unit-base';
import {BidResultTypeBase} from '../database-models/bid-result-type-base';
import {BuyerBidDefinitionBase} from '../database-models/buyer-bid-definition-base';
import {HtmlBase} from '../database-models/html-base';
import {JobPricingBase} from '../database-models/job-pricing-base';
import {JobStepBase} from '../database-models/job-step-base';
import {VendorPoolBase} from '../database-models/vendor-pool-base';
import {BidTermAcceptanceBase} from '../database-models/bid-term-acceptance-base';
import {BidTermSetBase} from '../database-models/bid-term-set-base';
import {BidSessionAvailableFileBase} from '../database-models/bid-session-available-file-base';
import {BidSessionVendorBase} from '../database-models/bid-session-vendor-base';
import {BidSessionNonDisclosureAgreementBase} from '../database-models/bid-session-non-disclosure-agreement-base';
import {BidSessionOrgAttributeBase} from '../database-models/bid-session-org-attribute-base';
import {BidSessionCostSavingBase} from '../database-models/bid-session-cost-saving-base';
//Generated Imports
export class BidSession extends BidSessionBase 
{




//#region Generated Reference Properties
//#region awardedJobStep Prop
awardedJobStep : JobStepBase;
//#endregion awardedJobStep Prop
//#region awardOffsetUnit Prop
awardOffsetUnit : TimeOffSetUnitBase;
//#endregion awardOffsetUnit Prop
//#region bidResultType Prop
bidResultType : BidResultTypeBase;
//#endregion bidResultType Prop
//#region buyerBidDefinition Prop
buyerBidDefinition : BuyerBidDefinitionBase;
//#endregion buyerBidDefinition Prop
//#region html Prop
html : xHtmlBase;
//#endregion html Prop
//#region jobPricing Prop
jobPricing : JobPricingBase;
//#endregion jobPricing Prop
//#region jobStep Prop
jobStep : JobStepBase;
//#endregion jobStep Prop
//#region vendorPool Prop
vendorPool : VendorPoolBase;
//#endregion vendorPool Prop
//#region bidTermAcceptances Prop
bidTermAcceptances : BidTermAcceptanceBase[];
//#endregion bidTermAcceptances Prop
//#region bidTermSets Prop
bidTermSets : BidTermSetBase[];
//#endregion bidTermSets Prop
//#region bidSessionAvailableFiles Prop
bidSessionAvailableFiles : BidSessionAvailableFileBase[];
//#endregion bidSessionAvailableFiles Prop
//#region bidSessionVendors Prop
bidSessionVendors : BidSessionVendorBase[];
//#endregion bidSessionVendors Prop
//#region bidSessionNonDisclosureAgreement Prop
bidSessionNonDisclosureAgreement : BidSessionNonDisclosureAgreementBase[];
//#endregion bidSessionNonDisclosureAgreement Prop
//#region bidSessionOrgAttributes Prop
bidSessionOrgAttributes : BidSessionOrgAttributeBase[];
//#endregion bidSessionOrgAttributes Prop
//#region bidSessionCostSavings Prop
bidSessionCostSavings : BidSessionCostSavingBase[];
//#endregion bidSessionCostSavings Prop

//#endregion Generated Reference Properties
}