import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidSessionBidderBase {

//#region bidSessionBidderId Prop
        @prop()
        bidSessionBidderId : number;
//#endregion bidSessionBidderId Prop


//#region bidSessionVendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidSessionVendorId : number;
//#endregion bidSessionVendorId Prop


//#region bidUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidUserId : number;
//#endregion bidUserId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop


//#region nonDisclosureAgreementDate Prop
        @prop()
        nonDisclosureAgreementDate : Date;
//#endregion nonDisclosureAgreementDate Prop


//#region bidStatusId Prop
        @required()
        bidStatusId : any;
//#endregion bidStatusId Prop


//#region awardStatusId Prop
        @required()
        awardStatusId : any;
//#endregion awardStatusId Prop


//#region awarderComment Prop
        @maxLength({value:4000})
        awarderComment : string;
//#endregion awarderComment Prop


//#region erroneousBidStatusId Prop
        @required()
        erroneousBidStatusId : any;
//#endregion erroneousBidStatusId Prop


//#region bidSessionId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidSessionId : number;
//#endregion bidSessionId Prop


//#region reasonForNoBidId Prop
        @prop()
        reasonForNoBidId : any;
//#endregion reasonForNoBidId Prop


//#region reasonForNoBidComment Prop
        @maxLength({value:2000})
        reasonForNoBidComment : string;
//#endregion reasonForNoBidComment Prop


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