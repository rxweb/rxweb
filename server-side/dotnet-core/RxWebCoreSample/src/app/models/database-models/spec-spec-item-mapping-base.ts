import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecSpecItemMappingBase {

//#region specSpecItemMappingId Prop
        @prop()
        specSpecItemMappingId : number;
//#endregion specSpecItemMappingId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region specItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specItemId : number;
//#endregion specItemId Prop


//#region workingSpecItemId Prop
        @prop()
        workingSpecItemId : number;
//#endregion workingSpecItemId Prop


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


//#region parentId Prop
        @prop()
        parentId : number;
//#endregion parentId Prop


//#region specSpecItemTypeId Prop
        @prop()
        specSpecItemTypeId : any;
//#endregion specSpecItemTypeId Prop























}