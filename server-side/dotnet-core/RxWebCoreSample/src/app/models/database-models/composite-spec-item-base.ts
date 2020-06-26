import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CompositeSpecItemBase {

//#region compositeSpecItemId Prop
        @prop()
        compositeSpecItemId : number;
//#endregion compositeSpecItemId Prop


//#region specSpecItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specSpecItemId : number;
//#endregion specSpecItemId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region refSpecSpecItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        refSpecSpecItemId : number;
//#endregion refSpecSpecItemId Prop


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


//#region quantity Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        quantity : number;
//#endregion quantity Prop


//#region workingQuantity Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        workingQuantity : number;
//#endregion workingQuantity Prop









}