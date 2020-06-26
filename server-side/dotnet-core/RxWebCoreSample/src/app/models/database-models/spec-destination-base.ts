import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecDestinationBase {

//#region specDestinationId Prop
        @prop()
        specDestinationId : number;
//#endregion specDestinationId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region destinationId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        destinationId : number;
//#endregion destinationId Prop


//#region workingDestinationId Prop
        @prop()
        workingDestinationId : number;
//#endregion workingDestinationId Prop


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