import {BulkNotifyBase} from '../database-models/bulk-notify-base';
import {ApprovalUserBase} from '../database-models/approval-user-base';
import {BulkNotifySelectionTypeBase} from '../database-models/bulk-notify-selection-type-base';
import {BulkNotifyTypeBase} from '../database-models/bulk-notify-type-base';
import {CreationUserBase} from '../database-models/creation-user-base';
import {JobBase} from '../database-models/job-base';
import {BulkNotifyRecipientBase} from '../database-models/bulk-notify-recipient-base';
//Generated Imports
export class BulkNotify extends BulkNotifyBase 
{




//#region Generated Reference Properties
//#region approvalUser Prop
approvalUser : UserBase;
//#endregion approvalUser Prop
//#region bulkNotifySelectionType Prop
bulkNotifySelectionType : BulkNotifySelectionTypeBase;
//#endregion bulkNotifySelectionType Prop
//#region bulkNotifyType Prop
bulkNotifyType : BulkNotifyTypeBase;
//#endregion bulkNotifyType Prop
//#region creationUser Prop
creationUser : UserBase;
//#endregion creationUser Prop
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region bulkNotifyRecipients Prop
bulkNotifyRecipients : BulkNotifyRecipientBase[];
//#endregion bulkNotifyRecipients Prop

//#endregion Generated Reference Properties
}