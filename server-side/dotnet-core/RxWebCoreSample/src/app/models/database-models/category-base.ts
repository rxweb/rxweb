import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CategoryBase {

//#region categoryId Prop
        @prop()
        categoryId : number;
//#endregion categoryId Prop


//#region categoryName Prop
        @required()
        @maxLength({value:50})
        categoryName : string;
//#endregion categoryName Prop


//#region categoryGroupId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        categoryGroupId : number;
//#endregion categoryGroupId Prop





}