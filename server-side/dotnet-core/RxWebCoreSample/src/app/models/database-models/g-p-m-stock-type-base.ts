import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class GPMStockTypeBase {

//#region stockTypeId Prop
        @prop()
        stockTypeId : number;
//#endregion stockTypeId Prop


//#region stockTypeName Prop
        @maxLength({value:50})
        stockTypeName : string;
//#endregion stockTypeName Prop


//#region legacyId Prop
        @maxLength({value:3})
        legacyId : string;
//#endregion legacyId Prop









}