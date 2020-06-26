import {JobStepBase} from '../database-models/job-step-base';
import {ClosedLoginBase} from '../database-models/closed-login-base';
import {ClosedUserBase} from '../database-models/closed-user-base';
import {FinancialLineItemBase} from '../database-models/financial-line-item-base';
import {JobBase} from '../database-models/job-base';
import {JobThreadBase} from '../database-models/job-thread-base';
import {NextJobStepBase} from '../database-models/next-job-step-base';
import {PendingFinancialLineItemBase} from '../database-models/pending-financial-line-item-base';
import {ProviderUserBase} from '../database-models/provider-user-base';
import {RoleCompanyMappingBase} from '../database-models/role-company-mapping-base';
import {SpecBase} from '../database-models/spec-base';
import {StepBase} from '../database-models/step-base';
import {StepNavigationBase} from '../database-models/step-navigation-base';
import {EstimateBase} from '../database-models/estimate-base';
import {BidSessionBase} from '../database-models/bid-session-base';
import {BidSessionsJobStepBase} from '../database-models/bid-sessions-job-step-base';
import {JobThreadsFirstJobStepBase} from '../database-models/job-threads-first-job-step-base';
import {FinancialLineItemsVendorJobStepBase} from '../database-models/financial-line-items-vendor-job-step-base';
import {BidSessionBidderBase} from '../database-models/bid-session-bidder-base';
import {TopicJobStepBase} from '../database-models/topic-job-step-base';
import {DeliveryBase} from '../database-models/delivery-base';
import {JobDeleteDetailBase} from '../database-models/job-delete-detail-base';
import {JobStepFileAttachmentBase} from '../database-models/job-step-file-attachment-base';
import {JobStepJobThreadBase} from '../database-models/job-step-job-thread-base';
import {ChangeRevisionBase} from '../database-models/change-revision-base';
import {MessageRecipientBase} from '../database-models/message-recipient-base';
import {DeliveryDetailBase} from '../database-models/delivery-detail-base';
import {ReceiveLogBase} from '../database-models/receive-log-base';
import {JobProcessBase} from '../database-models/job-process-base';
import {JobProcessJobStepMappingBase} from '../database-models/job-process-job-step-mapping-base';
import {JobUnInvitedBidderBase} from '../database-models/job-un-invited-bidder-base';
import {ShipLogBase} from '../database-models/ship-log-base';
import {ApproveLogBase} from '../database-models/approve-log-base';
import {MilestoneTaskBase} from '../database-models/milestone-task-base';
import {DirectJobLoginBase} from '../database-models/direct-job-login-base';
import {JobPricingBase} from '../database-models/job-pricing-base';
import {DirectLoginBase} from '../database-models/direct-login-base';
//Generated Imports
export class JobStep extends JobStepBase 
{




//#region Generated Reference Properties
//#region closedLogin Prop
closedLogin : UserBase;
//#endregion closedLogin Prop
//#region closedUser Prop
closedUser : UserBase;
//#endregion closedUser Prop
//#region financialLineItem Prop
financialLineItem : FinancialLineItemBase;
//#endregion financialLineItem Prop
//#region job Prop
job : JobBase;
//#endregion job Prop
//#region jobThread Prop
jobThread : JobThreadBase;
//#endregion jobThread Prop
//#region nextJobStep Prop
nextJobStep : JobStepBase;
//#endregion nextJobStep Prop
//#region pendingFinancialLineItem Prop
pendingFinancialLineItem : FinancialLineItemBase;
//#endregion pendingFinancialLineItem Prop
//#region providerUser Prop
providerUser : UserBase;
//#endregion providerUser Prop
//#region roleCompanyMapping Prop
roleCompanyMapping : RoleCompanyMappingBase;
//#endregion roleCompanyMapping Prop
//#region spec Prop
spec : SpecificationDetailBase;
//#endregion spec Prop
//#region step Prop
step : StepBase;
//#endregion step Prop
//#region stepNavigation Prop
stepNavigation : JobStepStatusBase;
//#endregion stepNavigation Prop
//#region estimates Prop
estimates : EstimateBase[];
//#endregion estimates Prop
//#region bidSessions Prop
bidSessions : BidSessionBase[];
//#endregion bidSessions Prop
//#region bidSessionsJobStep Prop
bidSessionsJobStep : BidSessionBase[];
//#endregion bidSessionsJobStep Prop
//#region jobThreads Prop
jobThreads : JobThreadBase[];
//#endregion jobThreads Prop
//#region jobThreadsFirstJobStep Prop
jobThreadsFirstJobStep : JobThreadBase[];
//#endregion jobThreadsFirstJobStep Prop
//#region financialLineItems Prop
financialLineItems : FinancialLineItemBase[];
//#endregion financialLineItems Prop
//#region financialLineItemsVendorJobStep Prop
financialLineItemsVendorJobStep : FinancialLineItemBase[];
//#endregion financialLineItemsVendorJobStep Prop
//#region bidSessionBidders Prop
bidSessionBidders : BidSessionBidderBase[];
//#endregion bidSessionBidders Prop
//#region topicJobSteps Prop
topicJobSteps : TopicJobStepBase[];
//#endregion topicJobSteps Prop
//#region deliveries Prop
deliveries : DeliveryBase[];
//#endregion deliveries Prop
//#region jobDeleteDetails Prop
jobDeleteDetails : JobDeleteDetailBase[];
//#endregion jobDeleteDetails Prop
//#region jobStepFileAttachments Prop
jobStepFileAttachments : JobStepFileAttachmentBase[];
//#endregion jobStepFileAttachments Prop
//#region jobStepJobThreads Prop
jobStepJobThreads : JobStepJobThreadBase[];
//#endregion jobStepJobThreads Prop
//#region changeRevisions Prop
changeRevisions : ChangeRevisionBase[];
//#endregion changeRevisions Prop
//#region messageRecipients Prop
messageRecipients : MessageRecipientBase[];
//#endregion messageRecipients Prop
//#region deliveryDetails Prop
deliveryDetails : DeliveryDetailBase[];
//#endregion deliveryDetails Prop
//#region receiveLogs Prop
receiveLogs : ReceiveLogBase[];
//#endregion receiveLogs Prop
//#region jobProcesses Prop
jobProcesses : JobProcessBase[];
//#endregion jobProcesses Prop
//#region jobProcessJobStepMapping Prop
jobProcessJobStepMapping : JobProcessJobStepMappingBase[];
//#endregion jobProcessJobStepMapping Prop
//#region jobUnInvitedBidders Prop
jobUnInvitedBidders : JobUnInvitedBidderBase[];
//#endregion jobUnInvitedBidders Prop
//#region shipLogs Prop
shipLogs : ShipLogBase[];
//#endregion shipLogs Prop
//#region approveLogs Prop
approveLogs : ApproveLogBase[];
//#endregion approveLogs Prop
//#region milestoneTasks Prop
milestoneTasks : MilestoneTaskBase[];
//#endregion milestoneTasks Prop
//#region directJobLogins Prop
directJobLogins : DirectJobLoginBase[];
//#endregion directJobLogins Prop
//#region jobPricings Prop
jobPricings : JobPricingBase[];
//#endregion jobPricings Prop
//#region directLogins Prop
directLogins : DirectLoginBase[];
//#endregion directLogins Prop
//#region jobSteps Prop
jobSteps : JobStepBase[];
//#endregion jobSteps Prop

//#endregion Generated Reference Properties
}