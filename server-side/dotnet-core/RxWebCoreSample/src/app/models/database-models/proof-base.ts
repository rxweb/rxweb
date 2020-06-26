import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProofBase {

//#region proofId Prop
        @prop()
        proofId : number;
//#endregion proofId Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region quantity Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        quantity : number;
//#endregion quantity Prop


//#region proofTypeId Prop
        @required()
        proofTypeId : any;
//#endregion proofTypeId Prop


//#region proofTypeName Prop
        @maxLength({value:4000})
        proofTypeName : string;
//#endregion proofTypeName Prop


//#region jobThreadId Prop
        @prop()
        jobThreadId : number;
//#endregion jobThreadId Prop


//#region proofApprovalScheduleId Prop
        @prop()
        proofApprovalScheduleId : any;
//#endregion proofApprovalScheduleId Prop


//#region timeOffsetUnitId Prop
        @prop()
        timeOffsetUnitId : any;
//#endregion timeOffsetUnitId Prop


//#region timeOffsetUnitQuantity Prop
        @prop()
        timeOffsetUnitQuantity : number;
//#endregion timeOffsetUnitQuantity Prop


//#region submitUserId Prop
        @prop()
        submitUserId : number;
//#endregion submitUserId Prop


//#region submitDate Prop
        @prop()
        submitDate : Date;
//#endregion submitDate Prop


//#region approveUserId Prop
        @prop()
        approveUserId : number;
//#endregion approveUserId Prop


//#region approveDate Prop
        @prop()
        approveDate : Date;
//#endregion approveDate Prop


//#region vendorAdjustable Prop
        @prop()
        vendorAdjustable : number;
//#endregion vendorAdjustable Prop













}