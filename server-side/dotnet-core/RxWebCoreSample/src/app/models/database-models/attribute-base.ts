import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AttributeBase {

//#region attributeId Prop
        @prop()
        attributeId : any;
//#endregion attributeId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : any;
//#endregion displayOrder Prop


//#region attributeTypeId Prop
        @prop()
        attributeTypeId : number;
//#endregion attributeTypeId Prop


//#region eN_AttributeName Prop
        @required()
        @maxLength({value:1000})
        eN_AttributeName : string;
//#endregion eN_AttributeName Prop


//#region eN_Helptext Prop
        @maxLength({value:1000})
        eN_Helptext : string;
//#endregion eN_Helptext Prop


//#region fR_AttributeName Prop
        @maxLength({value:1000})
        fR_AttributeName : string;
//#endregion fR_AttributeName Prop


//#region fR_Helptext Prop
        @maxLength({value:1000})
        fR_Helptext : string;
//#endregion fR_Helptext Prop







}