import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ShipmentHistoryBase {

//#region shipmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        shipmentId : number;
//#endregion shipmentId Prop


//#region specId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specId : number;
//#endregion specId Prop


//#region specDestinationId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specDestinationId : number;
//#endregion specDestinationId Prop


//#region specSpecsItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specSpecsItemId : number;
//#endregion specSpecsItemId Prop


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
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
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
        @required()
        shipDate : Date;
//#endregion shipDate Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region historyStatusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        historyStatusId : number;
//#endregion historyStatusId Prop


//#region editTimestamp Prop
        @required()
        editTimestamp : Date;
//#endregion editTimestamp Prop

}