import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class GPMProofTypeBase {

//#region proofId Prop
        @prop()
        proofId : number;
//#endregion proofId Prop


//#region proofName Prop
        @maxLength({value:100})
        proofName : string;
//#endregion proofName Prop


//#region legacyCode Prop
        @maxLength({value:3})
        legacyCode : string;
//#endregion legacyCode Prop





}