import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DataItemVisibilityBase {

//#region dataItemVisibilityId Prop
        @prop()
        dataItemVisibilityId : any;
//#endregion dataItemVisibilityId Prop


//#region eN_DataItemVisibilityName Prop
        @required()
        @maxLength({value:500})
        eN_DataItemVisibilityName : string;
//#endregion eN_DataItemVisibilityName Prop


//#region fR_DataItemVisibilityName Prop
        @required()
        @maxLength({value:500})
        fR_DataItemVisibilityName : string;
//#endregion fR_DataItemVisibilityName Prop

}