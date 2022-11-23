import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SupportTypeBase {

//#region supportTypeId Prop
        @prop()
        supportTypeId : any;
//#endregion supportTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_SupportTypesName Prop
        @required()
        @maxLength({value:500})
        eN_SupportTypesName : string;
//#endregion eN_SupportTypesName Prop


//#region fR_SupportTypesName Prop
        @maxLength({value:500})
        fR_SupportTypesName : string;
//#endregion fR_SupportTypesName Prop



}