import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TimeOffSetRuleBase {

//#region timeOffSetRuleId Prop
        @prop()
        timeOffSetRuleId : any;
//#endregion timeOffSetRuleId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_TimeOffSetRule Prop
        @required()
        @maxLength({value:500})
        eN_TimeOffSetRule : string;
//#endregion eN_TimeOffSetRule Prop


//#region fR_TimeOffSetRule Prop
        @required()
        @maxLength({value:500})
        fR_TimeOffSetRule : string;
//#endregion fR_TimeOffSetRule Prop



}