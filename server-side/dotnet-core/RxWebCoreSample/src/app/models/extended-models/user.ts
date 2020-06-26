import {UserBase} from '../database-models/user-base';
import {ActingUserBase} from '../database-models/acting-user-base';
import {BidResultTypeMaskBase} from '../database-models/bid-result-type-mask-base';
import {BrandBase} from '../database-models/brand-base';
import {CompanyBase} from '../database-models/company-base';
import {CurrencyFormatMaskBase} from '../database-models/currency-format-mask-base';
import {CurrencyBase} from '../database-models/currency-base';
import {DateFormatMaskBase} from '../database-models/date-format-mask-base';
import {DepartmentBase} from '../database-models/department-base';
import {JobGroupBase} from '../database-models/job-group-base';
import {LanguageBase} from '../database-models/language-base';
import {MemberStatuBase} from '../database-models/member-statu-base';
import {MemberTypeNameNavigationBase} from '../database-models/member-type-name-navigation-base';
import {ParentidNavigationBase} from '../database-models/parentid-navigation-base';
import {ReportAccessBase} from '../database-models/report-access-base';
import {TerritoryBase} from '../database-models/territory-base';
import {TimezoneBase} from '../database-models/timezone-base';
import {VendorBackgroundBase} from '../database-models/vendor-background-base';
import {FileDownloadAuditBase} from '../database-models/file-download-audit-base';
import {FileDownloadAuditsDownloadUserBase} from '../database-models/file-download-audits-download-user-base';
import {ServiceFeeInvoiceBase} from '../database-models/service-fee-invoice-base';
import {ServiceFeeInvoicesUpdatedByNavigationBase} from '../database-models/service-fee-invoices-updated-by-navigation-base';
import {TopicBase} from '../database-models/topic-base';
import {TopicsCreateUserBase} from '../database-models/topics-create-user-base';
import {ContractBase} from '../database-models/contract-base';
import {ServiceFeeBatchBase} from '../database-models/service-fee-batch-base';
import {ServiceFeeBatchesProcessedByUserBase} from '../database-models/service-fee-batches-processed-by-user-base';
import {EmailRegistrationBase} from '../database-models/email-registration-base';
import {LogicalFileBase} from '../database-models/logical-file-base';
import {ServiceFeeBase} from '../database-models/service-fee-base';
import {ServiceFeesCompletedByUserBase} from '../database-models/service-fees-completed-by-user-base';
import {ServiceFeesCreatedByLoginBase} from '../database-models/service-fees-created-by-login-base';
import {ServiceFeesCreatedByUserBase} from '../database-models/service-fees-created-by-user-base';
import {NoteDeliveryBase} from '../database-models/note-delivery-base';
import {EstimateTermAcceptanceBase} from '../database-models/estimate-term-acceptance-base';
import {EstimateTermAcceptancesAcceptUserBase} from '../database-models/estimate-term-acceptances-accept-user-base';
import {ResourceAcquiredJobBase} from '../database-models/resource-acquired-job-base';
import {ResourceAcquiredJobsResourceUserBase} from '../database-models/resource-acquired-jobs-resource-user-base';
import {SupportLogBase} from '../database-models/support-log-base';
import {SupportLogsUserBase} from '../database-models/support-logs-user-base';
import {DataItemBase} from '../database-models/data-item-base';
import {BidSessionBidderBase} from '../database-models/bid-session-bidder-base';
import {EventLogBase} from '../database-models/event-log-base';
import {EventLogsEventUserBase} from '../database-models/event-logs-event-user-base';
import {EventLogsTargetUserBase} from '../database-models/event-logs-target-user-base';
import {ProjectBase} from '../database-models/project-base';
import {JobTeamBase} from '../database-models/job-team-base';
import {ResourceGroupMemberBase} from '../database-models/resource-group-member-base';
import {ResourceGroupMembersResourceUserBase} from '../database-models/resource-group-members-resource-user-base';
import {VendorPoolBase} from '../database-models/vendor-pool-base';
import {ProjectTaskBase} from '../database-models/project-task-base';
import {VendorAssignedTeamMemberBase} from '../database-models/vendor-assigned-team-member-base';
import {VendorBase} from '../database-models/vendor-base';
import {VendorsVendorNavigationBase} from '../database-models/vendors-vendor-navigation-base';
import {UserAbilityOptionBase} from '../database-models/user-ability-option-base';
import {JobBase} from '../database-models/job-base';
import {JobsBuyerDepartmentBase} from '../database-models/jobs-buyer-department-base';
import {JobsBuyerUserBase} from '../database-models/jobs-buyer-user-base';
import {JobsOriginatingDepartmentBase} from '../database-models/jobs-originating-department-base';
import {JobsVendorCompanyBase} from '../database-models/jobs-vendor-company-base';
import {JobsVendorDepartmentBase} from '../database-models/jobs-vendor-department-base';
import {JobsVendorUserBase} from '../database-models/jobs-vendor-user-base';
import {UserRightOptionBase} from '../database-models/user-right-option-base';
import {BulkNotifyBase} from '../database-models/bulk-notify-base';
import {BulkNotifyCreationUserBase} from '../database-models/bulk-notify-creation-user-base';
import {TermSetBase} from '../database-models/term-set-base';
import {VendorTeamMemberBase} from '../database-models/vendor-team-member-base';
import {LogicalFileInstanceBase} from '../database-models/logical-file-instance-base';
import {LogicalFileInstancesActionUserBase} from '../database-models/logical-file-instances-action-user-base';
import {BuyerFeatureMappingBase} from '../database-models/buyer-feature-mapping-base';
import {VendorTermAcceptanceBase} from '../database-models/vendor-term-acceptance-base';
import {VendorTermAcceptancesAcceptUserBase} from '../database-models/vendor-term-acceptances-accept-user-base';
import {SampleEvaluationBase} from '../database-models/sample-evaluation-base';
import {SampleEvaluationsEvaluationLoginBase} from '../database-models/sample-evaluations-evaluation-login-base';
import {SampleEvaluationsEvaluationUserBase} from '../database-models/sample-evaluations-evaluation-user-base';
import {MailRecipientBase} from '../database-models/mail-recipient-base';
import {MessageBase} from '../database-models/message-base';
import {MessagesAuthorUserBase} from '../database-models/messages-author-user-base';
import {PaymentTransferLogBase} from '../database-models/payment-transfer-log-base';
import {MessageRecipientBase} from '../database-models/message-recipient-base';
import {MessageRecipientsRecipientUserBase} from '../database-models/message-recipients-recipient-user-base';
import {ReconcileLogBase} from '../database-models/reconcile-log-base';
import {ReconcileLogsReconcileUserBase} from '../database-models/reconcile-logs-reconcile-user-base';
import {ShipmentBase} from '../database-models/shipment-base';
import {ShipmentsShipperUserBase} from '../database-models/shipments-shipper-user-base';
import {SpecDestinationDetailBase} from '../database-models/spec-destination-detail-base';
import {SpecDestinationDetailsDefaultReceiveUserBase} from '../database-models/spec-destination-details-default-receive-user-base';
import {VendorPoolSubscriptionBase} from '../database-models/vendor-pool-subscription-base';
import {ComponentCustomFieldBase} from '../database-models/component-custom-field-base';
import {AddressBase} from '../database-models/address-base';
import {JobDeleteReasonBase} from '../database-models/job-delete-reason-base';
import {SetupRequestBase} from '../database-models/setup-request-base';
import {SetupRequestsCloneCompBase} from '../database-models/setup-requests-clone-comp-base';
import {SetupRequestsProductAgentBase} from '../database-models/setup-requests-product-agent-base';
import {SetupRequestsProviderDeptBase} from '../database-models/setup-requests-provider-dept-base';
import {SetupRequestsRequestedByDeptBase} from '../database-models/setup-requests-requested-by-dept-base';
import {SetupRequestsRequestedByUserBase} from '../database-models/setup-requests-requested-by-user-base';
import {SetupRequestsRequestedUserBase} from '../database-models/setup-requests-requested-user-base';
import {PhoneBase} from '../database-models/phone-base';
import {UserDataItemBase} from '../database-models/user-data-item-base';
import {ReceiveLogBase} from '../database-models/receive-log-base';
import {ReceiveLogsReceiveUserBase} from '../database-models/receive-logs-receive-user-base';
import {ComponentEvaluationBase} from '../database-models/component-evaluation-base';
import {ComponentEvaluationsEvaluationLoginBase} from '../database-models/component-evaluations-evaluation-login-base';
import {ComponentEvaluationsEvaluationUserBase} from '../database-models/component-evaluations-evaluation-user-base';
import {CustomTextMemberBase} from '../database-models/custom-text-member-base';
import {MailBase} from '../database-models/mail-base';
import {SetupMemberSequenceBase} from '../database-models/setup-member-sequence-base';
import {SetupMemberSequencesSecondaryBase} from '../database-models/setup-member-sequences-secondary-base';
import {ChangeOrderBase} from '../database-models/change-order-base';
import {JobUnInvitedBidderBase} from '../database-models/job-un-invited-bidder-base';
import {NonDisclosureAgreementEstimateAcceptBase} from '../database-models/non-disclosure-agreement-estimate-accept-base';
import {VendorQualifierBase} from '../database-models/vendor-qualifier-base';
import {ApproveLogBase} from '../database-models/approve-log-base';
import {ApproveLogsApproveUserBase} from '../database-models/approve-logs-approve-user-base';
import {BidSessionNonDisclosureAgreementBase} from '../database-models/bid-session-non-disclosure-agreement-base';
import {BidSessionNonDisclosureAgreementUserBase} from '../database-models/bid-session-non-disclosure-agreement-user-base';
import {MemberPortfolioBase} from '../database-models/member-portfolio-base';
import {AdvertisingSpecialtyInstituteMemberBase} from '../database-models/advertising-specialty-institute-member-base';
import {DirectJobLoginBase} from '../database-models/direct-job-login-base';
import {DirectJobLoginsUserBase} from '../database-models/direct-job-logins-user-base';
import {FinancialXferPreferenceBase} from '../database-models/financial-xfer-preference-base';
import {DepartmentServiceBase} from '../database-models/department-service-base';
import {DepartmentServicesProviderAgentBase} from '../database-models/department-services-provider-agent-base';
import {DepartmentServicesProviderDepartmentBase} from '../database-models/department-services-provider-department-base';
import {DirectLoginBase} from '../database-models/direct-login-base';
import {DirectLoginsLoginUserBase} from '../database-models/direct-logins-login-user-base';
import {DirectLoginsUserBase} from '../database-models/direct-logins-user-base';
import {BidSessionPriceBase} from '../database-models/bid-session-price-base';
import {BidSessionPricesBidderUserBase} from '../database-models/bid-session-prices-bidder-user-base';
import {JobStepBase} from '../database-models/job-step-base';
import {JobStepsClosedUserBase} from '../database-models/job-steps-closed-user-base';
import {JobStepsProviderUserBase} from '../database-models/job-steps-provider-user-base';
import {BidTermAcceptanceBase} from '../database-models/bid-term-acceptance-base';
import {BidTermAcceptancesAcceptUserBase} from '../database-models/bid-term-acceptances-accept-user-base';
import {SetupMemberBase} from '../database-models/setup-member-base';
import {SetupMembersSecondaryBase} from '../database-models/setup-members-secondary-base';
import {BuyerBase} from '../database-models/buyer-base';
import {ElectronicDataInterchangeInvoiceBase} from '../database-models/electronic-data-interchange-invoice-base';
import {NoteBase} from '../database-models/note-base';
import {UserDepartmentRoleBase} from '../database-models/user-department-role-base';
import {UsersCompanyBase} from '../database-models/users-company-base';
import {UsersDepartmentBase} from '../database-models/users-department-base';
import {UsersParentidNavigationBase} from '../database-models/users-parentid-navigation-base';
//Generated Imports
export class User extends UserBase 
{




//#region Generated Reference Properties
//#region actingUser Prop
actingUser : UserBase;
//#endregion actingUser Prop
//#region bidResultTypeMask Prop
bidResultTypeMask : BidResultTypeMaskBase;
//#endregion bidResultTypeMask Prop
//#region brand Prop
brand : BrandBase;
//#endregion brand Prop
//#region company Prop
company : UserBase;
//#endregion company Prop
//#region currencyFormatMask Prop
currencyFormatMask : CurrencyFormatMaskBase;
//#endregion currencyFormatMask Prop
//#region currency Prop
currency : CurrencyBase;
//#endregion currency Prop
//#region dateFormatMask Prop
dateFormatMask : DateFormatMaskBase;
//#endregion dateFormatMask Prop
//#region department Prop
department : UserBase;
//#endregion department Prop
//#region jobGroup Prop
jobGroup : JobGroupBase;
//#endregion jobGroup Prop
//#region language Prop
language : SupportedLanguageBase;
//#endregion language Prop
//#region memberStatus Prop
memberStatus : MemberStatusBase;
//#endregion memberStatus Prop
//#region memberTypeNameNavigation Prop
memberTypeNameNavigation : MemberTypeBase;
//#endregion memberTypeNameNavigation Prop
//#region parentidNavigation Prop
parentidNavigation : UserBase;
//#endregion parentidNavigation Prop
//#region reportAccess Prop
reportAccess : ReportAccessBase;
//#endregion reportAccess Prop
//#region territory Prop
territory : TerritoryBase;
//#endregion territory Prop
//#region timezone Prop
timezone : TimeZoneBase;
//#endregion timezone Prop
//#region vendorBackgrounds Prop
vendorBackgrounds : VendorBackgroundBase[];
//#endregion vendorBackgrounds Prop
//#region fileDownloadAudits Prop
fileDownloadAudits : FileDownloadAuditBase[];
//#endregion fileDownloadAudits Prop
//#region fileDownloadAuditsDownloadUser Prop
fileDownloadAuditsDownloadUser : FileDownloadAuditBase[];
//#endregion fileDownloadAuditsDownloadUser Prop
//#region serviceFeeInvoices Prop
serviceFeeInvoices : ServiceFeeInvoiceBase[];
//#endregion serviceFeeInvoices Prop
//#region serviceFeeInvoicesUpdatedByNavigation Prop
serviceFeeInvoicesUpdatedByNavigation : ServiceFeeInvoiceBase[];
//#endregion serviceFeeInvoicesUpdatedByNavigation Prop
//#region topics Prop
topics : TopicBase[];
//#endregion topics Prop
//#region topicsCreateUser Prop
topicsCreateUser : TopicBase[];
//#endregion topicsCreateUser Prop
//#region contracts Prop
contracts : ContractBase[];
//#endregion contracts Prop
//#region serviceFeeBatches Prop
serviceFeeBatches : ServiceFeeBatchBase[];
//#endregion serviceFeeBatches Prop
//#region serviceFeeBatchesProcessedByUser Prop
serviceFeeBatchesProcessedByUser : ServiceFeeBatchBase[];
//#endregion serviceFeeBatchesProcessedByUser Prop
//#region emailRegistrations Prop
emailRegistrations : EmailRegistrationBase[];
//#endregion emailRegistrations Prop
//#region logicalFiles Prop
logicalFiles : LogicalFileBase[];
//#endregion logicalFiles Prop
//#region serviceFees Prop
serviceFees : ServiceFeeBase[];
//#endregion serviceFees Prop
//#region serviceFeesCompletedByUser Prop
serviceFeesCompletedByUser : ServiceFeeBase[];
//#endregion serviceFeesCompletedByUser Prop
//#region serviceFeesCreatedByLogin Prop
serviceFeesCreatedByLogin : ServiceFeeBase[];
//#endregion serviceFeesCreatedByLogin Prop
//#region serviceFeesCreatedByUser Prop
serviceFeesCreatedByUser : ServiceFeeBase[];
//#endregion serviceFeesCreatedByUser Prop
//#region noteDeliveries Prop
noteDeliveries : NoteDeliveryBase[];
//#endregion noteDeliveries Prop
//#region estimateTermAcceptances Prop
estimateTermAcceptances : EstimateTermAcceptanceBase[];
//#endregion estimateTermAcceptances Prop
//#region estimateTermAcceptancesAcceptUser Prop
estimateTermAcceptancesAcceptUser : EstimateTermAcceptanceBase[];
//#endregion estimateTermAcceptancesAcceptUser Prop
//#region resourceAcquiredJobs Prop
resourceAcquiredJobs : ResourceAcquiredJobBase[];
//#endregion resourceAcquiredJobs Prop
//#region resourceAcquiredJobsResourceUser Prop
resourceAcquiredJobsResourceUser : ResourceAcquiredJobBase[];
//#endregion resourceAcquiredJobsResourceUser Prop
//#region supportLogs Prop
supportLogs : SupportLogBase[];
//#endregion supportLogs Prop
//#region supportLogsUser Prop
supportLogsUser : SupportLogBase[];
//#endregion supportLogsUser Prop
//#region dataItems Prop
dataItems : DataItemBase[];
//#endregion dataItems Prop
//#region bidSessionBidders Prop
bidSessionBidders : BidSessionBidderBase[];
//#endregion bidSessionBidders Prop
//#region eventLogs Prop
eventLogs : EventLogBase[];
//#endregion eventLogs Prop
//#region eventLogsEventUser Prop
eventLogsEventUser : EventLogBase[];
//#endregion eventLogsEventUser Prop
//#region eventLogsTargetUser Prop
eventLogsTargetUser : EventLogBase[];
//#endregion eventLogsTargetUser Prop
//#region projects Prop
projects : ProjectBase[];
//#endregion projects Prop
//#region jobTeams Prop
jobTeams : JobTeamBase[];
//#endregion jobTeams Prop
//#region resourceGroupMembers Prop
resourceGroupMembers : ResourceGroupMemberBase[];
//#endregion resourceGroupMembers Prop
//#region resourceGroupMembersResourceUser Prop
resourceGroupMembersResourceUser : ResourceGroupMemberBase[];
//#endregion resourceGroupMembersResourceUser Prop
//#region vendorPools Prop
vendorPools : VendorPoolBase[];
//#endregion vendorPools Prop
//#region projectTasks Prop
projectTasks : ProjectTaskBase[];
//#endregion projectTasks Prop
//#region vendorAssignedTeamMembers Prop
vendorAssignedTeamMembers : VendorAssignedTeamMemberBase[];
//#endregion vendorAssignedTeamMembers Prop
//#region vendors Prop
vendors : VendorBase[];
//#endregion vendors Prop
//#region vendorsVendorNavigation Prop
vendorsVendorNavigation : VendorBase[];
//#endregion vendorsVendorNavigation Prop
//#region userAbilityOptions Prop
userAbilityOptions : UserAbilityOptionBase[];
//#endregion userAbilityOptions Prop
//#region jobs Prop
jobs : JobBase[];
//#endregion jobs Prop
//#region jobsBuyerDepartment Prop
jobsBuyerDepartment : JobBase[];
//#endregion jobsBuyerDepartment Prop
//#region jobsBuyerUser Prop
jobsBuyerUser : JobBase[];
//#endregion jobsBuyerUser Prop
//#region jobsOriginatingDepartment Prop
jobsOriginatingDepartment : JobBase[];
//#endregion jobsOriginatingDepartment Prop
//#region jobsVendorCompany Prop
jobsVendorCompany : JobBase[];
//#endregion jobsVendorCompany Prop
//#region jobsVendorDepartment Prop
jobsVendorDepartment : JobBase[];
//#endregion jobsVendorDepartment Prop
//#region jobsVendorUser Prop
jobsVendorUser : JobBase[];
//#endregion jobsVendorUser Prop
//#region userRightOptions Prop
userRightOptions : UserRightOptionBase[];
//#endregion userRightOptions Prop
//#region bulkNotify Prop
bulkNotify : BulkNotifyBase[];
//#endregion bulkNotify Prop
//#region bulkNotifyCreationUser Prop
bulkNotifyCreationUser : BulkNotifyBase[];
//#endregion bulkNotifyCreationUser Prop
//#region termSets Prop
termSets : TermSetBase[];
//#endregion termSets Prop
//#region vendorTeamMembers Prop
vendorTeamMembers : VendorTeamMemberBase[];
//#endregion vendorTeamMembers Prop
//#region logicalFileInstances Prop
logicalFileInstances : LogicalFileInstanceBase[];
//#endregion logicalFileInstances Prop
//#region logicalFileInstancesActionUser Prop
logicalFileInstancesActionUser : LogicalFileInstanceBase[];
//#endregion logicalFileInstancesActionUser Prop
//#region buyerFeatureMappings Prop
buyerFeatureMappings : BuyerFeatureMappingBase[];
//#endregion buyerFeatureMappings Prop
//#region vendorTermAcceptances Prop
vendorTermAcceptances : VendorTermAcceptanceBase[];
//#endregion vendorTermAcceptances Prop
//#region vendorTermAcceptancesAcceptUser Prop
vendorTermAcceptancesAcceptUser : VendorTermAcceptanceBase[];
//#endregion vendorTermAcceptancesAcceptUser Prop
//#region sampleEvaluations Prop
sampleEvaluations : SampleEvaluationBase[];
//#endregion sampleEvaluations Prop
//#region sampleEvaluationsEvaluationLogin Prop
sampleEvaluationsEvaluationLogin : SampleEvaluationBase[];
//#endregion sampleEvaluationsEvaluationLogin Prop
//#region sampleEvaluationsEvaluationUser Prop
sampleEvaluationsEvaluationUser : SampleEvaluationBase[];
//#endregion sampleEvaluationsEvaluationUser Prop
//#region mailRecipients Prop
mailRecipients : MailRecipientBase[];
//#endregion mailRecipients Prop
//#region messages Prop
messages : MessageBase[];
//#endregion messages Prop
//#region messagesAuthorUser Prop
messagesAuthorUser : MessageBase[];
//#endregion messagesAuthorUser Prop
//#region paymentTransferLogs Prop
paymentTransferLogs : PaymentTransferLogBase[];
//#endregion paymentTransferLogs Prop
//#region messageRecipients Prop
messageRecipients : MessageRecipientBase[];
//#endregion messageRecipients Prop
//#region messageRecipientsRecipientUser Prop
messageRecipientsRecipientUser : MessageRecipientBase[];
//#endregion messageRecipientsRecipientUser Prop
//#region reconcileLogs Prop
reconcileLogs : ReconcileLogBase[];
//#endregion reconcileLogs Prop
//#region reconcileLogsReconcileUser Prop
reconcileLogsReconcileUser : ReconcileLogBase[];
//#endregion reconcileLogsReconcileUser Prop
//#region shipments Prop
shipments : ShipmentBase[];
//#endregion shipments Prop
//#region shipmentsShipperUser Prop
shipmentsShipperUser : ShipmentBase[];
//#endregion shipmentsShipperUser Prop
//#region specDestinationDetails Prop
specDestinationDetails : SpecDestinationDetailBase[];
//#endregion specDestinationDetails Prop
//#region specDestinationDetailsDefaultReceiveUser Prop
specDestinationDetailsDefaultReceiveUser : SpecDestinationDetailBase[];
//#endregion specDestinationDetailsDefaultReceiveUser Prop
//#region vendorPoolSubscriptions Prop
vendorPoolSubscriptions : VendorPoolSubscriptionBase[];
//#endregion vendorPoolSubscriptions Prop
//#region componentCustomFields Prop
componentCustomFields : ComponentCustomFieldBase[];
//#endregion componentCustomFields Prop
//#region addresses Prop
addresses : AddressBase[];
//#endregion addresses Prop
//#region jobDeleteReasons Prop
jobDeleteReasons : JobDeleteReasonBase[];
//#endregion jobDeleteReasons Prop
//#region setupRequests Prop
setupRequests : SetupRequestBase[];
//#endregion setupRequests Prop
//#region setupRequestsCloneComp Prop
setupRequestsCloneComp : SetupRequestBase[];
//#endregion setupRequestsCloneComp Prop
//#region setupRequestsProductAgent Prop
setupRequestsProductAgent : SetupRequestBase[];
//#endregion setupRequestsProductAgent Prop
//#region setupRequestsProviderDept Prop
setupRequestsProviderDept : SetupRequestBase[];
//#endregion setupRequestsProviderDept Prop
//#region setupRequestsRequestedByDept Prop
setupRequestsRequestedByDept : SetupRequestBase[];
//#endregion setupRequestsRequestedByDept Prop
//#region setupRequestsRequestedByUser Prop
setupRequestsRequestedByUser : SetupRequestBase[];
//#endregion setupRequestsRequestedByUser Prop
//#region setupRequestsRequestedUser Prop
setupRequestsRequestedUser : SetupRequestBase[];
//#endregion setupRequestsRequestedUser Prop
//#region phones Prop
phones : PhoneBase[];
//#endregion phones Prop
//#region userDataItems Prop
userDataItems : UserDataItemBase[];
//#endregion userDataItems Prop
//#region receiveLogs Prop
receiveLogs : ReceiveLogBase[];
//#endregion receiveLogs Prop
//#region receiveLogsReceiveUser Prop
receiveLogsReceiveUser : ReceiveLogBase[];
//#endregion receiveLogsReceiveUser Prop
//#region componentEvaluations Prop
componentEvaluations : ComponentEvaluationBase[];
//#endregion componentEvaluations Prop
//#region componentEvaluationsEvaluationLogin Prop
componentEvaluationsEvaluationLogin : ComponentEvaluationBase[];
//#endregion componentEvaluationsEvaluationLogin Prop
//#region componentEvaluationsEvaluationUser Prop
componentEvaluationsEvaluationUser : ComponentEvaluationBase[];
//#endregion componentEvaluationsEvaluationUser Prop
//#region customTextMembers Prop
customTextMembers : CustomTextMemberBase[];
//#endregion customTextMembers Prop
//#region mails Prop
mails : MailBase[];
//#endregion mails Prop
//#region setupMemberSequences Prop
setupMemberSequences : SetupMemberSequenceBase[];
//#endregion setupMemberSequences Prop
//#region setupMemberSequencesSecondary Prop
setupMemberSequencesSecondary : SetupMemberSequenceBase[];
//#endregion setupMemberSequencesSecondary Prop
//#region changeOrders Prop
changeOrders : ChangeOrderBase[];
//#endregion changeOrders Prop
//#region jobUnInvitedBidders Prop
jobUnInvitedBidders : JobUnInvitedBidderBase[];
//#endregion jobUnInvitedBidders Prop
//#region nonDisclosureAgreementEstimateAccept Prop
nonDisclosureAgreementEstimateAccept : NonDisclosureAgreementEstimateAcceptBase[];
//#endregion nonDisclosureAgreementEstimateAccept Prop
//#region vendorQualifiers Prop
vendorQualifiers : VendorQualifierBase[];
//#endregion vendorQualifiers Prop
//#region approveLogs Prop
approveLogs : ApproveLogBase[];
//#endregion approveLogs Prop
//#region approveLogsApproveUser Prop
approveLogsApproveUser : ApproveLogBase[];
//#endregion approveLogsApproveUser Prop
//#region bidSessionNonDisclosureAgreement Prop
bidSessionNonDisclosureAgreement : BidSessionNonDisclosureAgreementBase[];
//#endregion bidSessionNonDisclosureAgreement Prop
//#region bidSessionNonDisclosureAgreementUser Prop
bidSessionNonDisclosureAgreementUser : BidSessionNonDisclosureAgreementBase[];
//#endregion bidSessionNonDisclosureAgreementUser Prop
//#region memberPortfolios Prop
memberPortfolios : MemberPortfolioBase[];
//#endregion memberPortfolios Prop
//#region advertisingSpecialtyInstituteMembers Prop
advertisingSpecialtyInstituteMembers : AdvertisingSpecialtyInstituteMemberBase[];
//#endregion advertisingSpecialtyInstituteMembers Prop
//#region directJobLogins Prop
directJobLogins : DirectJobLoginBase[];
//#endregion directJobLogins Prop
//#region directJobLoginsUser Prop
directJobLoginsUser : DirectJobLoginBase[];
//#endregion directJobLoginsUser Prop
//#region financialXferPreferences Prop
financialXferPreferences : FinancialXferPreferenceBase[];
//#endregion financialXferPreferences Prop
//#region departmentServices Prop
departmentServices : DepartmentServiceBase[];
//#endregion departmentServices Prop
//#region departmentServicesProviderAgent Prop
departmentServicesProviderAgent : DepartmentServiceBase[];
//#endregion departmentServicesProviderAgent Prop
//#region departmentServicesProviderDepartment Prop
departmentServicesProviderDepartment : DepartmentServiceBase[];
//#endregion departmentServicesProviderDepartment Prop
//#region directLogins Prop
directLogins : DirectLoginBase[];
//#endregion directLogins Prop
//#region directLoginsLoginUser Prop
directLoginsLoginUser : DirectLoginBase[];
//#endregion directLoginsLoginUser Prop
//#region directLoginsUser Prop
directLoginsUser : DirectLoginBase[];
//#endregion directLoginsUser Prop
//#region bidSessionPrices Prop
bidSessionPrices : BidSessionPriceBase[];
//#endregion bidSessionPrices Prop
//#region bidSessionPricesBidderUser Prop
bidSessionPricesBidderUser : BidSessionPriceBase[];
//#endregion bidSessionPricesBidderUser Prop
//#region jobSteps Prop
jobSteps : JobStepBase[];
//#endregion jobSteps Prop
//#region jobStepsClosedUser Prop
jobStepsClosedUser : JobStepBase[];
//#endregion jobStepsClosedUser Prop
//#region jobStepsProviderUser Prop
jobStepsProviderUser : JobStepBase[];
//#endregion jobStepsProviderUser Prop
//#region bidTermAcceptances Prop
bidTermAcceptances : BidTermAcceptanceBase[];
//#endregion bidTermAcceptances Prop
//#region bidTermAcceptancesAcceptUser Prop
bidTermAcceptancesAcceptUser : BidTermAcceptanceBase[];
//#endregion bidTermAcceptancesAcceptUser Prop
//#region setupMembers Prop
setupMembers : SetupMemberBase[];
//#endregion setupMembers Prop
//#region setupMembersSecondary Prop
setupMembersSecondary : SetupMemberBase[];
//#endregion setupMembersSecondary Prop
//#region buyers Prop
buyers : BuyerBase[];
//#endregion buyers Prop
//#region electronicDataInterchangeInvoices Prop
electronicDataInterchangeInvoices : ElectronicDataInterchangeInvoiceBase[];
//#endregion electronicDataInterchangeInvoices Prop
//#region notes Prop
notes : NoteBase[];
//#endregion notes Prop
//#region userDepartmentRoles Prop
userDepartmentRoles : UserDepartmentRoleBase[];
//#endregion userDepartmentRoles Prop
//#region users Prop
users : UserBase[];
//#endregion users Prop
//#region usersCompany Prop
usersCompany : UserBase[];
//#endregion usersCompany Prop
//#region usersDepartment Prop
usersDepartment : UserBase[];
//#endregion usersDepartment Prop
//#region usersParentidNavigation Prop
usersParentidNavigation : UserBase[];
//#endregion usersParentidNavigation Prop

//#endregion Generated Reference Properties








}