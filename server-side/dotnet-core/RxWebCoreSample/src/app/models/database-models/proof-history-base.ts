import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProofHistoryBase {

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
        @prop()
        quantity : number;
//#endregion quantity Prop


//#region proofTypeId Prop
        @prop()
        proofTypeId : number;
//#endregion proofTypeId Prop


//#region proofType Prop
        @maxLength({value:4000})
        proofType : string;
//#endregion proofType Prop


//#region jobThreadId Prop
        @prop()
        jobThreadId : number;
//#endregion jobThreadId Prop


//#region proofApprovalScheduleId Prop
        @prop()
        proofApprovalScheduleId : number;
//#endregion proofApprovalScheduleId Prop


//#region timeOffsetUnitId Prop
        @prop()
        timeOffsetUnitId : number;
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


//#region specItemCurrentStatusId Prop
        @prop()
        specItemCurrentStatusId : number;
//#endregion specItemCurrentStatusId Prop


//#region workingProofId Prop
        @prop()
        workingProofId : number;
//#endregion workingProofId Prop


//#region vendorAdjustable Prop
        @prop()
        vendorAdjustable : number;
//#endregion vendorAdjustable Prop


//#region createdBy Prop
        @prop()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @prop()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @prop()
        updatedDateTime : any;
//#endregion updatedDateTime Prop

}