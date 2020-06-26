import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidResultTypeMaskBase {

//#region bidResultTypeMaskId Prop
        @prop()
        bidResultTypeMaskId : any;
//#endregion bidResultTypeMaskId Prop


//#region eN_BidResultTypeMaskName Prop
        @required()
        @maxLength({value:500})
        eN_BidResultTypeMaskName : string;
//#endregion eN_BidResultTypeMaskName Prop


//#region fR_BidResultTypeMaskName Prop
        @required()
        @maxLength({value:500})
        fR_BidResultTypeMaskName : string;
//#endregion fR_BidResultTypeMaskName Prop



}