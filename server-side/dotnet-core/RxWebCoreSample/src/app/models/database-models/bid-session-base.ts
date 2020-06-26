import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidSessionBase {

//#region bidSessionId Prop
        @prop()
        bidSessionId : number;
//#endregion bidSessionId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop


//#region htmlId Prop
        @prop()
        htmlId : number;
//#endregion htmlId Prop


//#region bidResultTypeId Prop
        @prop()
        bidResultTypeId : any;
//#endregion bidResultTypeId Prop


//#region priceCeiling Prop
        @prop()
        priceCeiling : number;
//#endregion priceCeiling Prop


//#region nonDisclosureAgreementTerms Prop
        @prop()
        nonDisclosureAgreementTerms : string;
//#endregion nonDisclosureAgreementTerms Prop


//#region awardOffsetUnitId Prop
        @prop()
        awardOffsetUnitId : any;
//#endregion awardOffsetUnitId Prop


//#region awardOffsetQuantity Prop
        @prop()
        awardOffsetQuantity : number;
//#endregion awardOffsetQuantity Prop


//#region vendorPoolId Prop
        @prop()
        vendorPoolId : number;
//#endregion vendorPoolId Prop


//#region awardedJobStepId Prop
        @prop()
        awardedJobStepId : number;
//#endregion awardedJobStepId Prop


//#region jobPricingId Prop
        @prop()
        jobPricingId : number;
//#endregion jobPricingId Prop


//#region directedBuyerVendorId Prop
        @prop()
        directedBuyerVendorId : number;
//#endregion directedBuyerVendorId Prop


//#region directedBuyerComment Prop
        @maxLength({value:4000})
        directedBuyerComment : string;
//#endregion directedBuyerComment Prop


//#region directedBuyerByUserId Prop
        @prop()
        directedBuyerByUserId : number;
//#endregion directedBuyerByUserId Prop


//#region directedBuyerDate Prop
        @prop()
        directedBuyerDate : Date;
//#endregion directedBuyerDate Prop


//#region buyerBidDefinitionId Prop
        @prop()
        buyerBidDefinitionId : number;
//#endregion buyerBidDefinitionId Prop


//#region awardByRadioSelection Prop
        @required()
        @maxLength({value:1})
        awardByRadioSelection : string;
//#endregion awardByRadioSelection Prop


//#region qualifiedVendorCount Prop
        @prop()
        qualifiedVendorCount : number;
//#endregion qualifiedVendorCount Prop


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