import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AwardTypeBase {

//#region awardTypeId Prop
        @prop()
        awardTypeId : any;
//#endregion awardTypeId Prop


//#region manifestConstant Prop
        @maxLength({value:100})
        manifestConstant : string;
//#endregion manifestConstant Prop


//#region eN_AwardTypeName Prop
        @maxLength({value:500})
        eN_AwardTypeName : string;
//#endregion eN_AwardTypeName Prop


//#region eN_AwardTypeBrief Prop
        @maxLength({value:500})
        eN_AwardTypeBrief : string;
//#endregion eN_AwardTypeBrief Prop


//#region fR_AwardTypeName Prop
        @maxLength({value:500})
        fR_AwardTypeName : string;
//#endregion fR_AwardTypeName Prop


//#region fR_AwardTypeBrief Prop
        @maxLength({value:500})
        fR_AwardTypeBrief : string;
//#endregion fR_AwardTypeBrief Prop

}