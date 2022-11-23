import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ShipmentBase {

//#region shipmentId Prop
        @prop()
        shipmentId : number;
//#endregion shipmentId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region specDestinationId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specDestinationId : number;
//#endregion specDestinationId Prop


//#region specSpecItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specSpecItemId : number;
//#endregion specSpecItemId Prop


//#region shipperUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        shipperUserId : number;
//#endregion shipperUserId Prop


//#region shipperLoginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        shipperLoginId : number;
//#endregion shipperLoginId Prop


//#region quantity Prop
        @prop()
        quantity : number;
//#endregion quantity Prop


//#region shippedVia Prop
        @maxLength({value:200})
        shippedVia : string;
//#endregion shippedVia Prop


//#region trackingNumber Prop
        @maxLength({value:4000})
        trackingNumber : string;
//#endregion trackingNumber Prop


//#region shipDate Prop
        @prop()
        shipDate : Date;
//#endregion shipDate Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region enteredTimestamp Prop
        @prop()
        enteredTimestamp : Date;
//#endregion enteredTimestamp Prop


//#region orderItemDueDate Prop
        @prop()
        orderItemDueDate : Date;
//#endregion orderItemDueDate Prop













}