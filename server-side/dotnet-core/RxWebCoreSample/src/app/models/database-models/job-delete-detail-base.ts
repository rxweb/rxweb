import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobDeleteDetailBase {

//#region jobDeleteDetailId Prop
        @prop()
        jobDeleteDetailId : number;
//#endregion jobDeleteDetailId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop


//#region jobDeleteReasonId Prop
        @required()
        jobDeleteReasonId : any;
//#endregion jobDeleteReasonId Prop


//#region deleteReason Prop
        @maxLength({value:4000})
        deleteReason : string;
//#endregion deleteReason Prop





}