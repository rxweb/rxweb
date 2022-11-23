import {JobBase} from '../database-models/job-base';
import {BuyerCompanyBase} from '../database-models/buyer-company-base';
import {BuyerDepartmentBase} from '../database-models/buyer-department-base';
import {BuyerUserBase} from '../database-models/buyer-user-base';
import {JobTypeBase} from '../database-models/job-type-base';
import {OriginatingDepartmentBase} from '../database-models/originating-department-base';
import {ParentJobBase} from '../database-models/parent-job-base';
import {ProjectBase} from '../database-models/project-base';
import {VendorCompanyBase} from '../database-models/vendor-company-base';
import {VendorDepartmentBase} from '../database-models/vendor-department-base';
import {VendorUserBase} from '../database-models/vendor-user-base';
import {BulkNotifyBase} from '../database-models/bulk-notify-base';
import {ProcurementJobBase} from '../database-models/procurement-job-base';
import {JobDataItemBase} from '../database-models/job-data-item-base';
import {TermSetBase} from '../database-models/term-set-base';
import {SampleEvaluationBase} from '../database-models/sample-evaluation-base';
import {SpecificationDetailBase} from '../database-models/specification-detail-base';
import {JobTemplateBase} from '../database-models/job-template-base';
import {JobFileAttachmentBase} from '../database-models/job-file-attachment-base';
import {SetupRequestBase} from '../database-models/setup-request-base';
import {SetupRequestsProviderJobBase} from '../database-models/setup-requests-provider-job-base';
import {ComponentEvaluationBase} from '../database-models/component-evaluation-base';
import {ChangeOrderBase} from '../database-models/change-order-base';
import {DirectJobLoginBase} from '../database-models/direct-job-login-base';
import {DirectLoginBase} from '../database-models/direct-login-base';
import {JobStepBase} from '../database-models/job-step-base';
import {ElectronicDataInterchangeInvoiceBase} from '../database-models/electronic-data-interchange-invoice-base';
import {JobThreadBase} from '../database-models/job-thread-base';
import {TopicBase} from '../database-models/topic-base';
import {FinancialLineItemBase} from '../database-models/financial-line-item-base';
import {ServiceFeeBase} from '../database-models/service-fee-base';
import {ResourceAcquiredJobBase} from '../database-models/resource-acquired-job-base';
import {EventLogBase} from '../database-models/event-log-base';
import {JobTeamBase} from '../database-models/job-team-base';
//Generated Imports
export class Job extends JobBase 
{




//#region Generated Reference Properties
//#region buyerCompany Prop
buyerCompany : UserBase;
//#endregion buyerCompany Prop
//#region buyerDepartment Prop
buyerDepartment : UserBase;
//#endregion buyerDepartment Prop
//#region buyerUser Prop
buyerUser : UserBase;
//#endregion buyerUser Prop
//#region jobType Prop
jobType : JobTypeBase;
//#endregion jobType Prop
//#region originatingDepartment Prop
originatingDepartment : UserBase;
//#endregion originatingDepartment Prop
//#region parentJob Prop
parentJob : JobBase;
//#endregion parentJob Prop
//#region project Prop
project : ProjectBase;
//#endregion project Prop
//#region vendorCompany Prop
vendorCompany : UserBase;
//#endregion vendorCompany Prop
//#region vendorDepartment Prop
vendorDepartment : UserBase;
//#endregion vendorDepartment Prop
//#region vendorUser Prop
vendorUser : UserBase;
//#endregion vendorUser Prop
//#region bulkNotify Prop
bulkNotify : BulkNotifyBase[];
//#endregion bulkNotify Prop
//#region procurementJobs Prop
procurementJobs : ProcurementJobBase[];
//#endregion procurementJobs Prop
//#region jobDataItems Prop
jobDataItems : JobDataItemBase[];
//#endregion jobDataItems Prop
//#region termSets Prop
termSets : TermSetBase[];
//#endregion termSets Prop
//#region sampleEvaluations Prop
sampleEvaluations : SampleEvaluationBase[];
//#endregion sampleEvaluations Prop
//#region specificationDetails Prop
specificationDetails : SpecificationDetailBase[];
//#endregion specificationDetails Prop
//#region jobTemplates Prop
jobTemplates : JobTemplateBase[];
//#endregion jobTemplates Prop
//#region jobFileAttachments Prop
jobFileAttachments : JobFileAttachmentBase[];
//#endregion jobFileAttachments Prop
//#region setupRequests Prop
setupRequests : SetupRequestBase[];
//#endregion setupRequests Prop
//#region setupRequestsProviderJob Prop
setupRequestsProviderJob : SetupRequestBase[];
//#endregion setupRequestsProviderJob Prop
//#region componentEvaluations Prop
componentEvaluations : ComponentEvaluationBase[];
//#endregion componentEvaluations Prop
//#region changeOrders Prop
changeOrders : ChangeOrderBase[];
//#endregion changeOrders Prop
//#region directJobLogins Prop
directJobLogins : DirectJobLoginBase[];
//#endregion directJobLogins Prop
//#region directLogins Prop
directLogins : DirectLoginBase[];
//#endregion directLogins Prop
//#region jobSteps Prop
jobSteps : JobStepBase[];
//#endregion jobSteps Prop
//#region electronicDataInterchangeInvoices Prop
electronicDataInterchangeInvoices : ElectronicDataInterchangeInvoiceBase[];
//#endregion electronicDataInterchangeInvoices Prop
//#region jobThreads Prop
jobThreads : JobThreadBase[];
//#endregion jobThreads Prop
//#region topics Prop
topics : TopicBase[];
//#endregion topics Prop
//#region financialLineItems Prop
financialLineItems : FinancialLineItemBase[];
//#endregion financialLineItems Prop
//#region serviceFees Prop
serviceFees : ServiceFeeBase[];
//#endregion serviceFees Prop
//#region resourceAcquiredJobs Prop
resourceAcquiredJobs : ResourceAcquiredJobBase[];
//#endregion resourceAcquiredJobs Prop
//#region eventLogs Prop
eventLogs : EventLogBase[];
//#endregion eventLogs Prop
//#region jobTeams Prop
jobTeams : JobTeamBase[];
//#endregion jobTeams Prop
//#region jobs Prop
jobs : JobBase[];
//#endregion jobs Prop

//#endregion Generated Reference Properties
}