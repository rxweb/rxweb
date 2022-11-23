import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateScheduleTypeBase {

//#region estimateScheduleTypeId Prop
        @prop()
        estimateScheduleTypeId : any;
//#endregion estimateScheduleTypeId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_EstimateScheduleTypeName Prop
        @required()
        @maxLength({value:500})
        eN_EstimateScheduleTypeName : string;
//#endregion eN_EstimateScheduleTypeName Prop


//#region eN_DisplayText Prop
        @required()
        @maxLength({value:500})
        eN_DisplayText : string;
//#endregion eN_DisplayText Prop


//#region fR_EstimateScheduleTypeName Prop
        @required()
        @maxLength({value:500})
        fR_EstimateScheduleTypeName : string;
//#endregion fR_EstimateScheduleTypeName Prop


//#region fR_DisplayText Prop
        @required()
        @maxLength({value:500})
        fR_DisplayText : string;
//#endregion fR_DisplayText Prop



}