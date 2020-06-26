import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobStepBase {

//#region jobStepId Prop
        @prop()
        jobStepId : number;
//#endregion jobStepId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region stepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        stepId : number;
//#endregion stepId Prop


//#region nextJobStepId Prop
        @prop()
        nextJobStepId : number;
//#endregion nextJobStepId Prop


//#region providerUserId Prop
        @prop()
        providerUserId : number;
//#endregion providerUserId Prop


//#region roleCompanyMappingId Prop
        @prop()
        roleCompanyMappingId : number;
//#endregion roleCompanyMappingId Prop


//#region alertDate Prop
        @prop()
        alertDate : Date;
//#endregion alertDate Prop


//#region viewed Prop
        @required()
        viewed : any;
//#endregion viewed Prop


//#region jobStepStatusId Prop
        @required()
        jobStepStatusId : any;
//#endregion jobStepStatusId Prop


//#region jobThreadId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobThreadId : number;
//#endregion jobThreadId Prop


//#region pendingAlertDate Prop
        @prop()
        pendingAlertDate : Date;
//#endregion pendingAlertDate Prop


//#region activatedDate Prop
        @prop()
        activatedDate : Date;
//#endregion activatedDate Prop


//#region autoCloseDate Prop
        @prop()
        autoCloseDate : Date;
//#endregion autoCloseDate Prop


//#region financialLineItemId Prop
        @prop()
        financialLineItemId : number;
//#endregion financialLineItemId Prop


//#region pendingFinancialLineItemId Prop
        @prop()
        pendingFinancialLineItemId : number;
//#endregion pendingFinancialLineItemId Prop


//#region closedUserId Prop
        @prop()
        closedUserId : number;
//#endregion closedUserId Prop


//#region closedLoginId Prop
        @prop()
        closedLoginId : number;
//#endregion closedLoginId Prop


//#region closedByName Prop
        @maxLength({value:250})
        closedByName : string;
//#endregion closedByName Prop


//#region closedTimestamp Prop
        @prop()
        closedTimestamp : Date;
//#endregion closedTimestamp Prop


//#region rowId Prop
        @required()
        rowId : any;
//#endregion rowId Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @required()
        updatedDateTime : any;
//#endregion updatedDateTime Prop















































































}