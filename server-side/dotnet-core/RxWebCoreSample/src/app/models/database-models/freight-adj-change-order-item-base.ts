import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FreightAdjChangeOrderItemBase {

//#region freightAdjLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        freightAdjLineItemId : number;
//#endregion freightAdjLineItemId Prop


//#region changeOrderLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        changeOrderLineItemId : number;
//#endregion changeOrderLineItemId Prop





}