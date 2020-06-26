import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DataProcAdjChngeOrdrItemBase {

//#region dataProcAdjLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        dataProcAdjLineItemId : number;
//#endregion dataProcAdjLineItemId Prop


//#region changeOrderLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        changeOrderLineItemId : number;
//#endregion changeOrderLineItemId Prop





}