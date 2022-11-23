import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DeliveryBase {

//#region deliveryId Prop
        @prop()
        deliveryId : number;
//#endregion deliveryId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop


//#region specDestinationId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specDestinationId : number;
//#endregion specDestinationId Prop


//#region receiveUserId Prop
        @prop()
        receiveUserId : number;
//#endregion receiveUserId Prop


//#region approveUserId Prop
        @prop()
        approveUserId : number;
//#endregion approveUserId Prop











}