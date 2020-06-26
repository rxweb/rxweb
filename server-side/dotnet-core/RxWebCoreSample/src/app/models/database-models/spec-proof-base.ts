import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecProofBase {

//#region specProofId Prop
        @prop()
        specProofId : number;
//#endregion specProofId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region proofId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        proofId : number;
//#endregion proofId Prop


//#region workingProofId Prop
        @prop()
        workingProofId : number;
//#endregion workingProofId Prop


//#region specItemInitialStatusId Prop
        @required()
        specItemInitialStatusId : any;
//#endregion specItemInitialStatusId Prop


//#region specItemCurrentStatusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specItemCurrentStatusId : number;
//#endregion specItemCurrentStatusId Prop


//#region shared Prop
        @required()
        @maxLength({value:1})
        shared : string;
//#endregion shared Prop











}