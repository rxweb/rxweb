import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ElynxxContractTypeBase {

//#region elynxxContractTypeId Prop
        @prop()
        elynxxContractTypeId : any;
//#endregion elynxxContractTypeId Prop


//#region eN_ElynxxContractTypeName Prop
        @required()
        @maxLength({value:500})
        eN_ElynxxContractTypeName : string;
//#endregion eN_ElynxxContractTypeName Prop


//#region fR_ElynxxContractTypeName Prop
        @required()
        @maxLength({value:500})
        fR_ElynxxContractTypeName : string;
//#endregion fR_ElynxxContractTypeName Prop

}