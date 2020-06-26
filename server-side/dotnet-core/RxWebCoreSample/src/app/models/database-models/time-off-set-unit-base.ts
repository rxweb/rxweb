import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TimeOffSetUnitBase {

//#region timeOffSetUnitId Prop
        @prop()
        timeOffSetUnitId : any;
//#endregion timeOffSetUnitId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_TimeOffSetUnit Prop
        @required()
        @maxLength({value:500})
        eN_TimeOffSetUnit : string;
//#endregion eN_TimeOffSetUnit Prop


//#region fR_TimeOffSetUnit Prop
        @required()
        @maxLength({value:500})
        fR_TimeOffSetUnit : string;
//#endregion fR_TimeOffSetUnit Prop







}