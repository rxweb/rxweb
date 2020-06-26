import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobDeleteReasonBase {

//#region jobDeleteReasonId Prop
        @prop()
        jobDeleteReasonId : any;
//#endregion jobDeleteReasonId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region companyId Prop
        @prop()
        companyId : number;
//#endregion companyId Prop


//#region statusTypeId Prop
        @prop()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_JobDeleteReasonName Prop
        @maxLength({value:500})
        eN_JobDeleteReasonName : string;
//#endregion eN_JobDeleteReasonName Prop


//#region fR_JobDeleteReasonName Prop
        @maxLength({value:500})
        fR_JobDeleteReasonName : string;
//#endregion fR_JobDeleteReasonName Prop





}