import {JobProcessBase} from '../database-models/job-process-base';
import {PrimaryJobStepBase} from '../database-models/primary-job-step-base';
import {SpecHtmlBase} from '../database-models/spec-html-base';
import {JobProcessJobStepMappingBase} from '../database-models/job-process-job-step-mapping-base';
import {JobProcessDataBase} from '../database-models/job-process-data-base';
import {ProcessFileAttachmentBase} from '../database-models/process-file-attachment-base';
//Generated Imports
export class JobProcess extends JobProcessBase 
{




//#region Generated Reference Properties
//#region primaryJobStep Prop
primaryJobStep : JobStepBase;
//#endregion primaryJobStep Prop
//#region specHtml Prop
specHtml : xHtmlBase;
//#endregion specHtml Prop
//#region jobProcessJobStepMapping Prop
jobProcessJobStepMapping : JobProcessJobStepMappingBase[];
//#endregion jobProcessJobStepMapping Prop
//#region jobProcessData Prop
jobProcessData : JobProcessDataBase[];
//#endregion jobProcessData Prop
//#region processFileAttachments Prop
processFileAttachments : ProcessFileAttachmentBase[];
//#endregion processFileAttachments Prop

//#endregion Generated Reference Properties
}