import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidSessionCostSavingBase {

//#region bidSessionId Prop
        @prop()
        bidSessionId : number;
//#endregion bidSessionId Prop


//#region lowBid Prop
        @prop()
        lowBid : any;
//#endregion lowBid Prop


//#region highBid Prop
        @prop()
        highBid : any;
//#endregion highBid Prop


//#region lowBidNotAcceptedBidCount Prop
        @prop()
        lowBidNotAcceptedBidCount : number;
//#endregion lowBidNotAcceptedBidCount Prop


//#region lowBidNotAcceptedBidSum Prop
        @prop()
        lowBidNotAcceptedBidSum : number;
//#endregion lowBidNotAcceptedBidSum Prop


//#region acceptedBidCount Prop
        @prop()
        acceptedBidCount : number;
//#endregion acceptedBidCount Prop


//#region acceptedBidSum Prop
        @prop()
        acceptedBidSum : any;
//#endregion acceptedBidSum Prop


//#region winningBid Prop
        @prop()
        winningBid : any;
//#endregion winningBid Prop


//#region erroneousBidCount Prop
        @prop()
        erroneousBidCount : any;
//#endregion erroneousBidCount Prop


//#region marketSavings Prop
        @prop()
        marketSavings : any;
//#endregion marketSavings Prop


//#region marketSavingsPercent Prop
        @prop()
        marketSavingsPercent : any;
//#endregion marketSavingsPercent Prop


//#region vendorsInvited Prop
        @prop()
        vendorsInvited : number;
//#endregion vendorsInvited Prop


//#region vendorsBid Prop
        @prop()
        vendorsBid : number;
//#endregion vendorsBid Prop


//#region vendorsRespondNobid Prop
        @prop()
        vendorsRespondNobid : number;
//#endregion vendorsRespondNobid Prop


//#region vendorsViewed Prop
        @prop()
        vendorsViewed : number;
//#endregion vendorsViewed Prop


//#region vendorsNotViewed Prop
        @prop()
        vendorsNotViewed : number;
//#endregion vendorsNotViewed Prop


//#region vendorsBidAccepted Prop
        @prop()
        vendorsBidAccepted : number;
//#endregion vendorsBidAccepted Prop


//#region vendorsBidLowBidNotAccepted Prop
        @prop()
        vendorsBidLowBidNotAccepted : number;
//#endregion vendorsBidLowBidNotAccepted Prop


//#region vendorsBidErroneous Prop
        @prop()
        vendorsBidErroneous : number;
//#endregion vendorsBidErroneous Prop


//#region awardTypeId Prop
        @prop()
        awardTypeId : number;
//#endregion awardTypeId Prop



}