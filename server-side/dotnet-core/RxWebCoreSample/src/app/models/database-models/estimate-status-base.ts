import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateStatusBase {

//#region estimateStatusId Prop
        @prop()
        estimateStatusId : any;
//#endregion estimateStatusId Prop


//#region eN_EstimateStatusName Prop
        @required()
        @maxLength({value:500})
        eN_EstimateStatusName : string;
//#endregion eN_EstimateStatusName Prop


//#region fR_EstimateStatusName Prop
        @required()
        @maxLength({value:500})
        fR_EstimateStatusName : string;
//#endregion fR_EstimateStatusName Prop



}