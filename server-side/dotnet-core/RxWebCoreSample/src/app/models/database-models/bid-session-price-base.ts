import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidSessionPriceBase {

//#region bidSessionPriceId Prop
        @prop()
        bidSessionPriceId : number;
//#endregion bidSessionPriceId Prop


//#region bidSessionBidderId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidSessionBidderId : number;
//#endregion bidSessionBidderId Prop


//#region price Prop
        @prop()
        price : number;
//#endregion price Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region bidderUserId Prop
        @prop()
        bidderUserId : number;
//#endregion bidderUserId Prop


//#region bidderLoginId Prop
        @prop()
        bidderLoginId : number;
//#endregion bidderLoginId Prop


//#region bidderDate Prop
        @prop()
        bidderDate : Date;
//#endregion bidderDate Prop


//#region postage Prop
        @prop()
        postage : number;
//#endregion postage Prop


//#region letterShop Prop
        @prop()
        letterShop : number;
//#endregion letterShop Prop


//#region freight Prop
        @prop()
        freight : number;
//#endregion freight Prop


//#region dataProcessing Prop
        @prop()
        dataProcessing : number;
//#endregion dataProcessing Prop


//#region paper Prop
        @prop()
        paper : number;
//#endregion paper Prop


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