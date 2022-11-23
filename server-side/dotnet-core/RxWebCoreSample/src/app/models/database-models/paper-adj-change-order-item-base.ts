import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PaperAdjChangeOrderItemBase {

//#region paperAdjLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        paperAdjLineItemId : number;
//#endregion paperAdjLineItemId Prop


//#region changeOrderLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        changeOrderLineItemId : number;
//#endregion changeOrderLineItemId Prop





}