import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TaxItemTypeBase {

//#region taxItemTypeId Prop
        @prop()
        taxItemTypeId : any;
//#endregion taxItemTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_TaxItemType Prop
        @maxLength({value:500})
        eN_TaxItemType : string;
//#endregion eN_TaxItemType Prop


//#region eN_Description Prop
        @maxLength({value:500})
        eN_Description : string;
//#endregion eN_Description Prop


//#region fR_TaxItemType Prop
        @maxLength({value:500})
        fR_TaxItemType : string;
//#endregion fR_TaxItemType Prop


//#region fR_Description Prop
        @maxLength({value:500})
        fR_Description : string;
//#endregion fR_Description Prop





}