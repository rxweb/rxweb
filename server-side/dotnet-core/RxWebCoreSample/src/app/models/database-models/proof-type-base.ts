import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProofTypeBase {

//#region proofTypeId Prop
        @prop()
        proofTypeId : any;
//#endregion proofTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_ProofTypesName Prop
        @required()
        @maxLength({value:500})
        eN_ProofTypesName : string;
//#endregion eN_ProofTypesName Prop


//#region fR_ProofTypesName Prop
        @maxLength({value:500})
        fR_ProofTypesName : string;
//#endregion fR_ProofTypesName Prop



}