import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidResultTypeBase {

//#region bidResultTypeId Prop
        @prop()
        bidResultTypeId : any;
//#endregion bidResultTypeId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_BidResultTypeName Prop
        @required()
        @maxLength({value:500})
        eN_BidResultTypeName : string;
//#endregion eN_BidResultTypeName Prop


//#region eN_SpecDescription Prop
        @required()
        @maxLength({value:500})
        eN_SpecDescription : string;
//#endregion eN_SpecDescription Prop


//#region fR_BidResultTypeName Prop
        @required()
        @maxLength({value:500})
        fR_BidResultTypeName : string;
//#endregion fR_BidResultTypeName Prop


//#region fR_SpecDescription Prop
        @required()
        @maxLength({value:500})
        fR_SpecDescription : string;
//#endregion fR_SpecDescription Prop





}