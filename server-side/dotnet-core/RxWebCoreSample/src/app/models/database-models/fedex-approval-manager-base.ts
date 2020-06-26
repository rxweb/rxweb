import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FedexApprovalManagerBase {

//#region fedexApprovalManagerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        fedexApprovalManagerId : number;
//#endregion fedexApprovalManagerId Prop


//#region bidSessionId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidSessionId : number;
//#endregion bidSessionId Prop


//#region managerUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        managerUserId : number;
//#endregion managerUserId Prop

}