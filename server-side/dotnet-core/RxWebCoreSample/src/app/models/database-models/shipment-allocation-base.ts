import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ShipmentAllocationBase {

//#region shipmentAllocationId Prop
        @prop()
        shipmentAllocationId : number;
//#endregion shipmentAllocationId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region specOrderItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specOrderItemId : number;
//#endregion specOrderItemId Prop


//#region shipmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        shipmentId : number;
//#endregion shipmentId Prop


//#region quantity Prop
        @prop()
        quantity : number;
//#endregion quantity Prop







}