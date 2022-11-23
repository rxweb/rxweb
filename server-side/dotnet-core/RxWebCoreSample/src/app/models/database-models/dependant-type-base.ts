import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DependantTypeBase {

//#region dependantTypeId Prop
        @prop()
        dependantTypeId : any;
//#endregion dependantTypeId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_DependantTypeName Prop
        @required()
        @maxLength({value:500})
        eN_DependantTypeName : string;
//#endregion eN_DependantTypeName Prop


//#region fR_DependantTypeName Prop
        @required()
        @maxLength({value:500})
        fR_DependantTypeName : string;
//#endregion fR_DependantTypeName Prop



}