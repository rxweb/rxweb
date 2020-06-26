import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TaxItemStatusBase {

//#region taxItemStatusId Prop
        @prop()
        taxItemStatusId : any;
//#endregion taxItemStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_TaxItemStatus Prop
        @required()
        @maxLength({value:500})
        eN_TaxItemStatus : string;
//#endregion eN_TaxItemStatus Prop


//#region fR_TaxItemStatus Prop
        @required()
        @maxLength({value:500})
        fR_TaxItemStatus : string;
//#endregion fR_TaxItemStatus Prop

}