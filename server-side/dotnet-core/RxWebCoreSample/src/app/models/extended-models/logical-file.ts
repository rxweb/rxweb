import {LogicalFileBase} from '../database-models/logical-file-base';
import {LogicalFileInstanceBase} from '../database-models/logical-file-instance-base';
import {LogicalFileTypeBase} from '../database-models/logical-file-type-base';
import {OwnerBase} from '../database-models/owner-base';
import {VendorFileAttachmentBase} from '../database-models/vendor-file-attachment-base';
import {JobFileAttachmentBase} from '../database-models/job-file-attachment-base';
import {ProcessFileAttachmentBase} from '../database-models/process-file-attachment-base';
import {BidSessionFileAttachmentBase} from '../database-models/bid-session-file-attachment-base';
import {EstimateFileAttachmentBase} from '../database-models/estimate-file-attachment-base';
//Generated Imports
export class LogicalFile extends LogicalFileBase 
{




//#region Generated Reference Properties
//#region logicalFileInstance Prop
logicalFileInstance : LogicalFileInstanceBase;
//#endregion logicalFileInstance Prop
//#region logicalFileType Prop
logicalFileType : LogicalFileTypeBase;
//#endregion logicalFileType Prop
//#region owner Prop
owner : UserBase;
//#endregion owner Prop
//#region vendorFileAttachments Prop
vendorFileAttachments : VendorFileAttachmentBase[];
//#endregion vendorFileAttachments Prop
//#region jobFileAttachments Prop
jobFileAttachments : JobFileAttachmentBase[];
//#endregion jobFileAttachments Prop
//#region processFileAttachments Prop
processFileAttachments : ProcessFileAttachmentBase[];
//#endregion processFileAttachments Prop
//#region bidSessionFileAttachments Prop
bidSessionFileAttachments : BidSessionFileAttachmentBase[];
//#endregion bidSessionFileAttachments Prop
//#region estimateFileAttachments Prop
estimateFileAttachments : EstimateFileAttachmentBase[];
//#endregion estimateFileAttachments Prop

//#endregion Generated Reference Properties
}