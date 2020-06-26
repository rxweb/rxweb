import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProofQuantityBase {

//#region proofQuantityId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        proofQuantityId : number;
//#endregion proofQuantityId Prop


//#region proofType Prop
        @maxLength({value:4000})
        proofType : string;
//#endregion proofType Prop


//#region usageCount Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        usageCount : number;
//#endregion usageCount Prop


//#region quantity Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        quantity : number;
//#endregion quantity Prop


//#region realQuantity Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        realQuantity : number;
//#endregion realQuantity Prop

}