import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecDeliveryBase {

//#region specDeliveryId Prop
        @prop()
        specDeliveryId : number;
//#endregion specDeliveryId Prop


//#region specId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specId : number;
//#endregion specId Prop


//#region deliveryId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        deliveryId : number;
//#endregion deliveryId Prop


//#region workingDeliveryId Prop
        @prop()
        workingDeliveryId : number;
//#endregion workingDeliveryId Prop


//#region specItemInitialStatusId Prop
        @prop()
        specItemInitialStatusId : any;
//#endregion specItemInitialStatusId Prop


//#region specItemCurrentStatusId Prop
        @prop()
        specItemCurrentStatusId : number;
//#endregion specItemCurrentStatusId Prop


//#region shared Prop
        @required()
        @maxLength({value:1})
        shared : string;
//#endregion shared Prop











}