import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DeliveryHistoryBase {

//#region deliveryId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        deliveryId : number;
//#endregion deliveryId Prop


//#region specDestinationId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specDestinationId : number;
//#endregion specDestinationId Prop


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