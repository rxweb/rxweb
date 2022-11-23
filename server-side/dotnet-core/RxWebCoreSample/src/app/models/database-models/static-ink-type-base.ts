import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class StaticInkTypeBase {

//#region staticInkTypeId Prop
        @prop()
        staticInkTypeId : any;
//#endregion staticInkTypeId Prop


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


//#region eN_StaticInkTypeName Prop
        @required()
        @maxLength({value:500})
        eN_StaticInkTypeName : string;
//#endregion eN_StaticInkTypeName Prop


//#region fR_StaticInkTypeName Prop
        @maxLength({value:500})
        fR_StaticInkTypeName : string;
//#endregion fR_StaticInkTypeName Prop



}