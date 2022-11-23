import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ComponentCustomFieldBase {

//#region componentCustomFieldId Prop
        @prop()
        componentCustomFieldId : number;
//#endregion componentCustomFieldId Prop


//#region componentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        componentId : number;
//#endregion componentId Prop


//#region ownerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        ownerId : number;
//#endregion ownerId Prop


//#region caption Prop
        @maxLength({value:100})
        caption : string;
//#endregion caption Prop


//#region customFieldTypeId Prop
        @required()
        customFieldTypeId : any;
//#endregion customFieldTypeId Prop


//#region active Prop
        @required()
        @maxLength({value:1})
        active : string;
//#endregion active Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop









}