import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecItemCustomFieldBase {

//#region specItemCustomFieldId Prop
        @prop()
        specItemCustomFieldId : number;
//#endregion specItemCustomFieldId Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region specSpecItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specSpecItemId : number;
//#endregion specSpecItemId Prop


//#region componentCustomFieldId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        componentCustomFieldId : number;
//#endregion componentCustomFieldId Prop


//#region value Prop
        @maxLength({value:4000})
        value : string;
//#endregion value Prop


//#region workingValue Prop
        @maxLength({value:4000})
        workingValue : string;
//#endregion workingValue Prop


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







}