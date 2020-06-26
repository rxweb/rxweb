import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DataItemOptionBase {

//#region dataItemOptionId Prop
        @prop()
        dataItemOptionId : any;
//#endregion dataItemOptionId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_DataItemOptionName Prop
        @required()
        @maxLength({value:500})
        eN_DataItemOptionName : string;
//#endregion eN_DataItemOptionName Prop


//#region fR_DataItemOptionName Prop
        @maxLength({value:500})
        fR_DataItemOptionName : string;
//#endregion fR_DataItemOptionName Prop

}