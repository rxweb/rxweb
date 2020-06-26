import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DbConstantBase {

//#region dbConstantId Prop
        @prop()
        dbConstantId : any;
//#endregion dbConstantId Prop


//#region constantName Prop
        @maxLength({value:2000})
        constantName : string;
//#endregion constantName Prop


//#region eN_ConstantName Prop
        @required()
        eN_ConstantName : string;
//#endregion eN_ConstantName Prop


//#region fR_ConstantName Prop
        @prop()
        fR_ConstantName : string;
//#endregion fR_ConstantName Prop

}