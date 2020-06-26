import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VariableInkTypeBase {

//#region variableInkTypeId Prop
        @prop()
        variableInkTypeId : any;
//#endregion variableInkTypeId Prop


//#region attributeId Prop
        @prop()
        attributeId : number;
//#endregion attributeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_VariableInkTypeName Prop
        @required()
        @maxLength({value:500})
        eN_VariableInkTypeName : string;
//#endregion eN_VariableInkTypeName Prop


//#region fR_VariableInkTypeName Prop
        @maxLength({value:500})
        fR_VariableInkTypeName : string;
//#endregion fR_VariableInkTypeName Prop



}