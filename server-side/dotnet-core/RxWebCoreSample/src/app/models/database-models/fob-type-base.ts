import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FobTypeBase {

//#region fobTypeId Prop
        @prop()
        fobTypeId : any;
//#endregion fobTypeId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_FobTypeName Prop
        @required()
        @maxLength({value:500})
        eN_FobTypeName : string;
//#endregion eN_FobTypeName Prop


//#region fR_FobTypeName Prop
        @maxLength({value:500})
        fR_FobTypeName : string;
//#endregion fR_FobTypeName Prop





}