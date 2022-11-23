import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ComponentCustomFieldChildBase {

//#region componentCustomFieldChildId Prop
        @prop()
        componentCustomFieldChildId : any;
//#endregion componentCustomFieldChildId Prop


//#region value Prop
        @required()
        @maxLength({value:100})
        value : string;
//#endregion value Prop


//#region text Prop
        @required()
        @maxLength({value:100})
        text : string;
//#endregion text Prop


//#region componentCustomFieldId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        componentCustomFieldId : number;
//#endregion componentCustomFieldId Prop


//#region active Prop
        @required()
        @maxLength({value:1})
        active : string;
//#endregion active Prop


//#region displayOrder Prop
        @prop()
        displayOrder : any;
//#endregion displayOrder Prop



}