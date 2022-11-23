import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ElynxxFeeTypeBase {

//#region elynxxFeeTypeId Prop
        @prop()
        elynxxFeeTypeId : any;
//#endregion elynxxFeeTypeId Prop


//#region eN_ElynxxFeeTypeName Prop
        @required()
        @maxLength({value:500})
        eN_ElynxxFeeTypeName : string;
//#endregion eN_ElynxxFeeTypeName Prop


//#region fR_ElynxxFeeTypeName Prop
        @required()
        @maxLength({value:500})
        fR_ElynxxFeeTypeName : string;
//#endregion fR_ElynxxFeeTypeName Prop

}