import {EstimateBase} from '../database-models/estimate-base';
import {EstimateScheduleTypeBase} from '../database-models/estimate-schedule-type-base';
import {HtmlBase} from '../database-models/html-base';
import {JobStepBase} from '../database-models/job-step-base';
import {EstimateAvailableFileBase} from '../database-models/estimate-available-file-base';
import {EstimateVendorBase} from '../database-models/estimate-vendor-base';
import {EstimateSpecUnitBase} from '../database-models/estimate-spec-unit-base';
import {EstimateTermAcceptanceBase} from '../database-models/estimate-term-acceptance-base';
import {EstimateTermSetBase} from '../database-models/estimate-term-set-base';
import {EstimateUnitBase} from '../database-models/estimate-unit-base';
import {NonDisclosureAgreementEstimateAcceptBase} from '../database-models/non-disclosure-agreement-estimate-accept-base';
//Generated Imports
export class Estimate extends EstimateBase 
{




//#region Generated Reference Properties
//#region estimateScheduleType Prop
estimateScheduleType : EstimateScheduleTypeBase;
//#endregion estimateScheduleType Prop
//#region html Prop
html : xHtmlBase;
//#endregion html Prop
//#region jobStep Prop
jobStep : JobStepBase;
//#endregion jobStep Prop
//#region estimateAvailableFiles Prop
estimateAvailableFiles : EstimateAvailableFileBase[];
//#endregion estimateAvailableFiles Prop
//#region estimateVendors Prop
estimateVendors : EstimateVendorBase[];
//#endregion estimateVendors Prop
//#region estimateSpecUnits Prop
estimateSpecUnits : EstimateSpecUnitBase[];
//#endregion estimateSpecUnits Prop
//#region estimateTermAcceptances Prop
estimateTermAcceptances : EstimateTermAcceptanceBase[];
//#endregion estimateTermAcceptances Prop
//#region estimateTermSets Prop
estimateTermSets : EstimateTermSetBase[];
//#endregion estimateTermSets Prop
//#region estimateUnits Prop
estimateUnits : EstimateUnitBase[];
//#endregion estimateUnits Prop
//#region nonDisclosureAgreementEstimateAccept Prop
nonDisclosureAgreementEstimateAccept : NonDisclosureAgreementEstimateAcceptBase[];
//#endregion nonDisclosureAgreementEstimateAccept Prop

//#endregion Generated Reference Properties
}