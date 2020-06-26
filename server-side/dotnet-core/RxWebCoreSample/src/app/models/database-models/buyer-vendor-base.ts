import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerVendorBase {

//#region buyerVendorId Prop
        @prop()
        buyerVendorId : number;
//#endregion buyerVendorId Prop


//#region buyerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerId : number;
//#endregion buyerId Prop


//#region vendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vendorId : number;
//#endregion vendorId Prop


//#region buyerVendorStatusId Prop
        @required()
        buyerVendorStatusId : any;
//#endregion buyerVendorStatusId Prop


//#region statusSetDate Prop
        @prop()
        statusSetDate : Date;
//#endregion statusSetDate Prop


//#region jobsInvited Prop
        @prop()
        jobsInvited : number;
//#endregion jobsInvited Prop


//#region jobsBid Prop
        @prop()
        jobsBid : number;
//#endregion jobsBid Prop


//#region jobsNoBid Prop
        @prop()
        jobsNoBid : number;
//#endregion jobsNoBid Prop


//#region jobsWon Prop
        @prop()
        jobsWon : number;
//#endregion jobsWon Prop


//#region jobsEstimateRequested Prop
        @prop()
        jobsEstimateRequested : number;
//#endregion jobsEstimateRequested Prop


//#region jobsEstimateProvided Prop
        @prop()
        jobsEstimateProvided : number;
//#endregion jobsEstimateProvided Prop


//#region buyerAgentId Prop
        @prop()
        buyerAgentId : number;
//#endregion buyerAgentId Prop


//#region vendorAgentId Prop
        @prop()
        vendorAgentId : number;
//#endregion vendorAgentId Prop


//#region companyIdentifier Prop
        @maxLength({value:25})
        companyIdentifier : string;
//#endregion companyIdentifier Prop


//#region rowId Prop
        @required()
        rowId : any;
//#endregion rowId Prop















}