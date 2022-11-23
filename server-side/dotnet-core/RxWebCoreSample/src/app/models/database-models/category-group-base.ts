import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CategoryGroupBase {

//#region categoryGroupId Prop
        @prop()
        categoryGroupId : number;
//#endregion categoryGroupId Prop


//#region categoryGroupName Prop
        @required()
        @maxLength({value:100})
        categoryGroupName : string;
//#endregion categoryGroupName Prop

}