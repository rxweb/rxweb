import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProcurementJobBase {

//#region procurementJobId Prop
        @prop()
        procurementJobId : number;
//#endregion procurementJobId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region priceHistorical Prop
        @prop()
        priceHistorical : number;
//#endregion priceHistorical Prop


//#region vendorPoolId Prop
        @prop()
        vendorPoolId : number;
//#endregion vendorPoolId Prop


//#region currencyId Prop
        @prop()
        currencyId : any;
//#endregion currencyId Prop


//#region pONumber Prop
        @maxLength({value:50})
        pONumber : string;
//#endregion pONumber Prop


//#region transactionPercentId Prop
        @prop()
        transactionPercentId : number;
//#endregion transactionPercentId Prop


//#region contractId Prop
        @prop()
        contractId : number;
//#endregion contractId Prop


//#region defaultBidResultTypeId Prop
        @prop()
        defaultBidResultTypeId : any;
//#endregion defaultBidResultTypeId Prop


//#region awardBidSessionId Prop
        @prop()
        awardBidSessionId : number;
//#endregion awardBidSessionId Prop


//#region taxExemptStatusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        taxExemptStatusTypeId : number;
//#endregion taxExemptStatusTypeId Prop


//#region serviceFeeCalculationId Prop
        @prop()
        serviceFeeCalculationId : number;
//#endregion serviceFeeCalculationId Prop


//#region jobStatusId Prop
        @prop()
        jobStatusId : any;
//#endregion jobStatusId Prop


//#region approvedConmodCount Prop
        @prop()
        approvedConmodCount : any;
//#endregion approvedConmodCount Prop


//#region approvedConmodAmount Prop
        @prop()
        approvedConmodAmount : any;
//#endregion approvedConmodAmount Prop


//#region approvedInvoiceCount Prop
        @prop()
        approvedInvoiceCount : number;
//#endregion approvedInvoiceCount Prop


//#region approvedInvoiceAmount Prop
        @prop()
        approvedInvoiceAmount : any;
//#endregion approvedInvoiceAmount Prop


//#region approvedInvoiceTaxAmount Prop
        @prop()
        approvedInvoiceTaxAmount : any;
//#endregion approvedInvoiceTaxAmount Prop


//#region approvedInvoiceShippingAmount Prop
        @prop()
        approvedInvoiceShippingAmount : any;
//#endregion approvedInvoiceShippingAmount Prop


//#region requisitionerId Prop
        @prop()
        requisitionerId : number;
//#endregion requisitionerId Prop


//#region awarderId Prop
        @prop()
        awarderId : number;
//#endregion awarderId Prop


//#region jobCoordinatorId Prop
        @prop()
        jobCoordinatorId : number;
//#endregion jobCoordinatorId Prop


//#region effectiveServiceFeePercent Prop
        @prop()
        effectiveServiceFeePercent : any;
//#endregion effectiveServiceFeePercent Prop


//#region serviceFeeCalcTypeId Prop
        @prop()
        serviceFeeCalcTypeId : any;
//#endregion serviceFeeCalcTypeId Prop


//#region vendorPostage Prop
        @prop()
        vendorPostage : number;
//#endregion vendorPostage Prop


//#region postageNotInBid Prop
        @prop()
        postageNotInBid : any;
//#endregion postageNotInBid Prop


//#region vendorLetterShop Prop
        @prop()
        vendorLetterShop : any;
//#endregion vendorLetterShop Prop


//#region vendorFreight Prop
        @prop()
        vendorFreight : number;
//#endregion vendorFreight Prop


//#region vendorDataProcessingId Prop
        @prop()
        vendorDataProcessingId : number;
//#endregion vendorDataProcessingId Prop


//#region vendorManufacturing Prop
        @prop()
        vendorManufacturing : number;
//#endregion vendorManufacturing Prop


//#region vendorPaper Prop
        @prop()
        vendorPaper : number;
//#endregion vendorPaper Prop


//#region freightNotInBid Prop
        @prop()
        freightNotInBid : number;
//#endregion freightNotInBid Prop


//#region freightNotInvoiced Prop
        @prop()
        freightNotInvoiced : number;
//#endregion freightNotInvoiced Prop


//#region postageNotInvoiced Prop
        @prop()
        postageNotInvoiced : number;
//#endregion postageNotInvoiced Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createDateTime Prop
        @prop()
        createDateTime : any;
//#endregion createDateTime Prop


//#region updatedBy Prop
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDataTime Prop
        @prop()
        updatedDataTime : any;
//#endregion updatedDataTime Prop













}