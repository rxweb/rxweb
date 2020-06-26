import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PortfolioTypeBase {

//#region portfolioTypeId Prop
        @prop()
        portfolioTypeId : any;
//#endregion portfolioTypeId Prop


//#region formName Prop
        @required()
        @maxLength({value:100})
        formName : string;
//#endregion formName Prop


//#region urlAction Prop
        @required()
        @maxLength({value:200})
        urlAction : string;
//#endregion urlAction Prop


//#region urlSuffix Prop
        @required()
        @maxLength({value:200})
        urlSuffix : string;
//#endregion urlSuffix Prop


//#region eN_TitleCaptionName Prop
        @required()
        @maxLength({value:500})
        eN_TitleCaptionName : string;
//#endregion eN_TitleCaptionName Prop


//#region fR_TitleCaptionName Prop
        @required()
        @maxLength({value:500})
        fR_TitleCaptionName : string;
//#endregion fR_TitleCaptionName Prop



}