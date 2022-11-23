import {LogicalFileInstanceBase} from '../database-models/logical-file-instance-base';
import {ActionLoginBase} from '../database-models/action-login-base';
import {ActionUserBase} from '../database-models/action-user-base';
import {FileAccessTypeBase} from '../database-models/file-access-type-base';
import {FileInstanceActionBase} from '../database-models/file-instance-action-base';
import {PriorLogicalFileInstanceBase} from '../database-models/prior-logical-file-instance-base';
import {EstimateAvailableFileBase} from '../database-models/estimate-available-file-base';
import {BidSessionAvailableFileBase} from '../database-models/bid-session-available-file-base';
import {FileDownloadAuditBase} from '../database-models/file-download-audit-base';
import {LogicalFileBase} from '../database-models/logical-file-base';
import {TopicLogicalFileInstanceBase} from '../database-models/topic-logical-file-instance-base';
//Generated Imports
export class LogicalFileInstance extends LogicalFileInstanceBase 
{




//#region Generated Reference Properties
//#region actionLogin Prop
actionLogin : UserBase;
//#endregion actionLogin Prop
//#region actionUser Prop
actionUser : UserBase;
//#endregion actionUser Prop
//#region fileAccessType Prop
fileAccessType : FileAccessTypeBase;
//#endregion fileAccessType Prop
//#region fileInstanceAction Prop
fileInstanceAction : FileInstanceActionBase;
//#endregion fileInstanceAction Prop
//#region priorLogicalFileInstance Prop
priorLogicalFileInstance : LogicalFileInstanceBase;
//#endregion priorLogicalFileInstance Prop
//#region estimateAvailableFiles Prop
estimateAvailableFiles : EstimateAvailableFileBase[];
//#endregion estimateAvailableFiles Prop
//#region bidSessionAvailableFiles Prop
bidSessionAvailableFiles : BidSessionAvailableFileBase[];
//#endregion bidSessionAvailableFiles Prop
//#region fileDownloadAudits Prop
fileDownloadAudits : FileDownloadAuditBase[];
//#endregion fileDownloadAudits Prop
//#region logicalFiles Prop
logicalFiles : LogicalFileBase[];
//#endregion logicalFiles Prop
//#region topicLogicalFileInstances Prop
topicLogicalFileInstances : TopicLogicalFileInstanceBase[];
//#endregion topicLogicalFileInstances Prop
//#region logicalFileInstances Prop
logicalFileInstances : LogicalFileInstanceBase[];
//#endregion logicalFileInstances Prop

//#endregion Generated Reference Properties
}