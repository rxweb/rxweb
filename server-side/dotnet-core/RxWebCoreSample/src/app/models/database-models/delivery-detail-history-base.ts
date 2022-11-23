import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DeliveryDetailHistoryBase {

//#region deliveryDetailId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        deliveryDetailId : number;
//#endregion deliveryDetailId Prop


//#region deliveryId Prop
        @prop()
        deliveryId : number;
//#endregion deliveryId Prop


//#region specUnitId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specUnitId : number;
//#endregion specUnitId Prop


//#region specDestinationId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specDestinationId : number;
//#endregion specDestinationId Prop


//#region dueDate Prop
        @prop()
        dueDate : Date;
//#endregion dueDate Prop


//#region quantity Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        quantity : number;
//#endregion quantity Prop


//#region deliveryDetailStatusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        deliveryDetailStatusId : number;
//#endregion deliveryDetailStatusId Prop


//#region jobStepId Prop
        @prop()
        jobStepId : number;
//#endregion jobStepId Prop


//#region qsSourceDeliveryDetailId Prop
        @prop()
        qsSourceDeliveryDetailId : number;
//#endregion qsSourceDeliveryDetailId Prop


//#region qsrShipmentId Prop
        @prop()
        qsrShipmentId : number;
//#endregion qsrShipmentId Prop


//#region financialLineItemId Prop
        @prop()
        financialLineItemId : number;
//#endregion financialLineItemId Prop


//#region currentReconcileLogId Prop
        @prop()
        currentReconcileLogId : number;
//#endregion currentReconcileLogId Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @required()
        updatedDateTime : any;
//#endregion updatedDateTime Prop

}