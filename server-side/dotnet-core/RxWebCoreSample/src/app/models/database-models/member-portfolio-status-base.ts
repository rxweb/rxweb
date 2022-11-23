import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MemberPortfolioStatusBase {

//#region memberPortfolioStatusId Prop
        @prop()
        memberPortfolioStatusId : any;
//#endregion memberPortfolioStatusId Prop


//#region eN_MemberPortfolioStatusName Prop
        @required()
        @maxLength({value:500})
        eN_MemberPortfolioStatusName : string;
//#endregion eN_MemberPortfolioStatusName Prop


//#region fR_MemberPortfolioStatusName Prop
        @required()
        @maxLength({value:500})
        fR_MemberPortfolioStatusName : string;
//#endregion fR_MemberPortfolioStatusName Prop



}