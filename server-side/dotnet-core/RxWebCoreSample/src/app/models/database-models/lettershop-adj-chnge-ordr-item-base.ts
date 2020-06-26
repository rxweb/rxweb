import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LettershopAdjChngeOrdrItemBase {

//#region lettershopAdjLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        lettershopAdjLineItemId : number;
//#endregion lettershopAdjLineItemId Prop


//#region changeOrderLineItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        changeOrderLineItemId : number;
//#endregion changeOrderLineItemId Prop





}