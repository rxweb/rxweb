import {JobFileAttachmentBase} from '../database-models/job-file-attachment-base';
import {JobBase} from '../database-models/job-base';
import {LogicalFileBase} from '../database-models/logical-file-base';
import {BuyerFurnishedMaterialFileAttachmentBase} from '../database-models/buyer-furnished-material-file-attachment-base';
import {MilestoneFileAttachmentBase} from '../database-models/milestone-file-attachment-base';
import {ProofFileAttachmentBase} from '../database-models/proof-file-attachment-base';
import {InvoiceFileAttachmentBase} from '../database-models/invoice-file-attachment-base';
import {DeliveryFileAttachmentBase} from '../database-models/delivery-file-attachment-base';
import {JobStepFileAttachmentBase} from '../database-models/job-step-file-attachment-base';
//Generated Imports
export class JobFileAttachment extends JobFileAttachmentBase 
{




//#region Generated Reference Properties
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region logicalFile Prop
logicalFile : LogicalFileBase;
//#endregion logicalFile Prop
//#region buyerFurnishedMaterialFileAttachments Prop
buyerFurnishedMaterialFileAttachments : BuyerFurnishedMaterialFileAttachmentBase[];
//#endregion buyerFurnishedMaterialFileAttachments Prop
//#region milestoneFileAttachments Prop
milestoneFileAttachments : MilestoneFileAttachmentBase[];
//#endregion milestoneFileAttachments Prop
//#region proofFileAttachments Prop
proofFileAttachments : ProofFileAttachmentBase[];
//#endregion proofFileAttachments Prop
//#region invoiceFileAttachments Prop
invoiceFileAttachments : InvoiceFileAttachmentBase[];
//#endregion invoiceFileAttachments Prop
//#region deliveryFileAttachments Prop
deliveryFileAttachments : DeliveryFileAttachmentBase[];
//#endregion deliveryFileAttachments Prop
//#region jobStepFileAttachments Prop
jobStepFileAttachments : JobStepFileAttachmentBase[];
//#endregion jobStepFileAttachments Prop

//#endregion Generated Reference Properties
}