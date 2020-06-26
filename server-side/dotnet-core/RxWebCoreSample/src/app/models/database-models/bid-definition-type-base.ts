import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidDefinitionTypeBase {

//#region bidDefinitionTypeId Prop
        @prop()
        bidDefinitionTypeId : any;
//#endregion bidDefinitionTypeId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_BidDefinitionTypeName Prop
        @required()
        @maxLength({value:500})
        eN_BidDefinitionTypeName : string;
//#endregion eN_BidDefinitionTypeName Prop


//#region eN_BriefDescription Prop
        @required()
        @maxLength({value:500})
        eN_BriefDescription : string;
//#endregion eN_BriefDescription Prop


//#region eN_SpecDescription Prop
        @required()
        @maxLength({value:500})
        eN_SpecDescription : string;
//#endregion eN_SpecDescription Prop


//#region fR_BidDefinitionTypeName Prop
        @maxLength({value:500})
        fR_BidDefinitionTypeName : string;
//#endregion fR_BidDefinitionTypeName Prop


//#region fR_BriefDescription Prop
        @maxLength({value:500})
        fR_BriefDescription : string;
//#endregion fR_BriefDescription Prop


//#region fR_SpecDescription Prop
        @maxLength({value:500})
        fR_SpecDescription : string;
//#endregion fR_SpecDescription Prop



}