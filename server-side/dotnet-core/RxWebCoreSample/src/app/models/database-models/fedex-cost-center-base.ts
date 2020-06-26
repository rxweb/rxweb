import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FedexCostCenterBase {

//#region fedexCostCenterName Prop
        @maxLength({value:20})
        fedexCostCenterName : string;
//#endregion fedexCostCenterName Prop


//#region costCenterTermsCustomId Prop
        @required()
        @maxLength({value:4000})
        costCenterTermsCustomId : string;
//#endregion costCenterTermsCustomId Prop

}