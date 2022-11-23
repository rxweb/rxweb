import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AttributeTypeBase {

//#region attributeTypeId Prop
        @required()
        attributeTypeId : any;
//#endregion attributeTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region eN_AttributeTypeName Prop
        @required()
        @maxLength({value:500})
        eN_AttributeTypeName : string;
//#endregion eN_AttributeTypeName Prop


//#region fR_AttributeTypeName Prop
        @maxLength({value:500})
        fR_AttributeTypeName : string;
//#endregion fR_AttributeTypeName Prop

}