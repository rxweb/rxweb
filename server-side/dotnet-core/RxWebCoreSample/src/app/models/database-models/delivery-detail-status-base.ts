import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DeliveryDetailStatusBase {

//#region deliveryDetailStatusId Prop
        @prop()
        deliveryDetailStatusId : any;
//#endregion deliveryDetailStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_DeliveryDetailStatusName Prop
        @required()
        @maxLength({value:500})
        eN_DeliveryDetailStatusName : string;
//#endregion eN_DeliveryDetailStatusName Prop


//#region fR_DeliveryDetailStatusName Prop
        @required()
        @maxLength({value:500})
        fR_DeliveryDetailStatusName : string;
//#endregion fR_DeliveryDetailStatusName Prop



}