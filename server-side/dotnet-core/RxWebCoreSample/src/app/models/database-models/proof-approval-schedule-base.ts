import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProofApprovalScheduleBase {

//#region proofApprovalScheduleId Prop
        @prop()
        proofApprovalScheduleId : any;
//#endregion proofApprovalScheduleId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_ProofApprovalScheduleName Prop
        @required()
        @maxLength({value:500})
        eN_ProofApprovalScheduleName : string;
//#endregion eN_ProofApprovalScheduleName Prop


//#region fR_ProofApprovalScheduleName Prop
        @required()
        @maxLength({value:500})
        fR_ProofApprovalScheduleName : string;
//#endregion fR_ProofApprovalScheduleName Prop



}