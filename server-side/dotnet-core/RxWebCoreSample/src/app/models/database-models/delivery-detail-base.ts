import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DeliveryDetailBase {

//#region deliveryDetailId Prop
        @prop()
        deliveryDetailId : number;
//#endregion deliveryDetailId Prop


//#region jobStepId Prop
        @prop()
        jobStepId : number;
//#endregion jobStepId Prop


//#region specUnitId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specUnitId : number;
//#endregion specUnitId Prop


//#region deliveryDetailStatusId Prop
        @required()
        deliveryDetailStatusId : any;
//#endregion deliveryDetailStatusId Prop


//#region quantity Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        quantity : number;
//#endregion quantity Prop


//#region specDestinationId Prop
        @prop()
        specDestinationId : number;
//#endregion specDestinationId Prop


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


//#region deliveryId Prop
        @prop()
        deliveryId : number;
//#endregion deliveryId Prop


//#region currentReconcileLogId Prop
        @prop()
        currentReconcileLogId : number;
//#endregion currentReconcileLogId Prop


//#region dueDate Prop
        @prop()
        dueDate : Date;
//#endregion dueDate Prop


//#region receiveDueDate Prop
        @prop()
        receiveDueDate : Date;
//#endregion receiveDueDate Prop


//#region approveDueDate Prop
        @prop()
        approveDueDate : Date;
//#endregion approveDueDate Prop

























}