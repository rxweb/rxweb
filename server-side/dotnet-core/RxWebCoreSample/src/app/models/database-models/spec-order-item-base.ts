import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecOrderItemBase {

//#region specOrderItemId Prop
        @prop()
        specOrderItemId : number;
//#endregion specOrderItemId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region orderItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        orderItemId : number;
//#endregion orderItemId Prop


//#region workingOrderItemId Prop
        @prop()
        workingOrderItemId : number;
//#endregion workingOrderItemId Prop


//#region specSpecItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specSpecItemId : number;
//#endregion specSpecItemId Prop


//#region specItemInitialStatusId Prop
        @required()
        specItemInitialStatusId : any;
//#endregion specItemInitialStatusId Prop


//#region specItemCurrentStatusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specItemCurrentStatusId : number;
//#endregion specItemCurrentStatusId Prop


//#region shared Prop
        @required()
        @maxLength({value:1})
        shared : string;
//#endregion shared Prop


//#region specDestinationId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specDestinationId : number;
//#endregion specDestinationId Prop


//#region fullyShippedDate Prop
        @prop()
        fullyShippedDate : Date;
//#endregion fullyShippedDate Prop















}