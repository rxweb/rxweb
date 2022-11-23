import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PlanBase {

//#region planId Prop
        @prop()
        planId : number;
//#endregion planId Prop


//#region personid Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        personid : number;
//#endregion personid Prop


//#region planDescription Prop
        @maxLength({value:500})
        planDescription : string;
//#endregion planDescription Prop


//#region effective Prop
        @prop()
        effective : Date;
//#endregion effective Prop


//#region expires Prop
        @prop()
        expires : Date;
//#endregion expires Prop


//#region name Prop
        @maxLength({value:100})
        name : string;
//#endregion name Prop





}