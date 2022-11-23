import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ServiceFeeCalculationBase {

//#region serviceFeeCalculationId Prop
        @prop()
        serviceFeeCalculationId : number;
//#endregion serviceFeeCalculationId Prop


//#region serviceFeeTermId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        serviceFeeTermId : number;
//#endregion serviceFeeTermId Prop


//#region thresholdVolume Prop
        @required()
        thresholdVolume : any;
//#endregion thresholdVolume Prop


//#region netInvoicePercent Prop
        @prop()
        netInvoicePercent : any;
//#endregion netInvoicePercent Prop


//#region marketSavingsPercent Prop
        @prop()
        marketSavingsPercent : number;
//#endregion marketSavingsPercent Prop


//#region directBuyPercent Prop
        @prop()
        directBuyPercent : number;
//#endregion directBuyPercent Prop





}