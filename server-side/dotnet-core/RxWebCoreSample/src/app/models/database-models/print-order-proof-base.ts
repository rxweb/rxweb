import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PrintOrderProofBase {

//#region printOrderProofId Prop
        @prop()
        printOrderProofId : number;
//#endregion printOrderProofId Prop


//#region printOrderId Prop
        @prop()
        printOrderId : number;
//#endregion printOrderId Prop


//#region proofId Prop
        @prop()
        proofId : number;
//#endregion proofId Prop


//#region displayOrder Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        displayOrder : number;
//#endregion displayOrder Prop





}