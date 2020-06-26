import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DataItemAttributeNameBase {

//#region dataItemAttributeNameId Prop
        @prop()
        dataItemAttributeNameId : any;
//#endregion dataItemAttributeNameId Prop


//#region name Prop
        @maxLength({value:4000})
        name : string;
//#endregion name Prop


//#region statusTypeId Prop
        @prop()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : any;
//#endregion displayOrder Prop



}