import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PlanCategoryMappingBase {

//#region planId Prop
        @prop()
        planId : number;
//#endregion planId Prop


//#region categoryId Prop
        @prop()
        categoryId : number;
//#endregion categoryId Prop





}