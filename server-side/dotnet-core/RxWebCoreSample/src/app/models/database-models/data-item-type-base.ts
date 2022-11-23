import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DataItemTypeBase {

//#region dataItemTypeId Prop
        @prop()
        dataItemTypeId : any;
//#endregion dataItemTypeId Prop


//#region dataItemTypeName Prop
        @maxLength({value:500})
        dataItemTypeName : string;
//#endregion dataItemTypeName Prop


//#region manifestConstant Prop
        @maxLength({value:30})
        manifestConstant : string;
//#endregion manifestConstant Prop



}