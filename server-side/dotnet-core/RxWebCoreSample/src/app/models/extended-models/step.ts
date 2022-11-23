import {StepBase} from '../database-models/step-base';
import {RightBase} from '../database-models/right-base';
import {ServiceBase} from '../database-models/service-base';
import {StepGroupBase} from '../database-models/step-group-base';
import {StepTypeBase} from '../database-models/step-type-base';
import {StepStepMappingBase} from '../database-models/step-step-mapping-base';
import {StepStepMappingsStepBase} from '../database-models/step-step-mappings-step-base';
import {JobStepBase} from '../database-models/job-step-base';
import {InvoiceFileAttachmentBase} from '../database-models/invoice-file-attachment-base';
import {AbilityScopeStepTeamBase} from '../database-models/ability-scope-step-team-base';
//Generated Imports
export class Step extends StepBase 
{




//#region Generated Reference Properties
//#region right Prop
right : RightBase;
//#endregion right Prop
//#region service Prop
service : ServiceBase;
//#endregion service Prop
//#region stepGroup Prop
stepGroup : StepGroupBase;
//#endregion stepGroup Prop
//#region stepType Prop
stepType : StepTypeBase;
//#endregion stepType Prop
//#region stepStepMappings Prop
stepStepMappings : StepStepMappingBase[];
//#endregion stepStepMappings Prop
//#region stepStepMappingsStep Prop
stepStepMappingsStep : StepStepMappingBase[];
//#endregion stepStepMappingsStep Prop
//#region jobSteps Prop
jobSteps : JobStepBase[];
//#endregion jobSteps Prop
//#region invoiceFileAttachments Prop
invoiceFileAttachments : InvoiceFileAttachmentBase[];
//#endregion invoiceFileAttachments Prop
//#region abilityScopeStepTeams Prop
abilityScopeStepTeams : AbilityScopeStepTeamBase[];
//#endregion abilityScopeStepTeams Prop

//#endregion Generated Reference Properties
}