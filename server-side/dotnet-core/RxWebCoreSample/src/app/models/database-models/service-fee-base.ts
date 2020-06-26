import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceFeeBase {

//#region serviceFeeId Prop
        @prop()
        serviceFeeId : number;
//#endregion serviceFeeId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region financialLineItemId Prop
        @prop()
        financialLineItemId : number;
//#endregion financialLineItemId Prop


//#region amount Prop
        @required()
        amount : number;
//#endregion amount Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region serviceFeeTypeId Prop
        @required()
        serviceFeeTypeId : any;
//#endregion serviceFeeTypeId Prop


//#region serviceFeeStatusId Prop
        @required()
        serviceFeeStatusId : any;
//#endregion serviceFeeStatusId Prop


//#region createdByUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdByUserId : number;
//#endregion createdByUserId Prop


//#region createdByLoginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdByLoginId : number;
//#endregion createdByLoginId Prop


//#region createdDate Prop
        @required()
        createdDate : Date;
//#endregion createdDate Prop


//#region completedDate Prop
        @prop()
        completedDate : Date;
//#endregion completedDate Prop


//#region completedByUserId Prop
        @prop()
        completedByUserId : number;
//#endregion completedByUserId Prop


//#region completedByLoginId Prop
        @prop()
        completedByLoginId : number;
//#endregion completedByLoginId Prop


//#region serviceFeeBatchId Prop
        @prop()
        serviceFeeBatchId : number;
//#endregion serviceFeeBatchId Prop


//#region serviceFeeInvoiceId Prop
        @prop()
        serviceFeeInvoiceId : number;
//#endregion serviceFeeInvoiceId Prop


//#region serviceFeeCalcTypeId Prop
        @prop()
        serviceFeeCalcTypeId : number;
//#endregion serviceFeeCalcTypeId Prop





















}