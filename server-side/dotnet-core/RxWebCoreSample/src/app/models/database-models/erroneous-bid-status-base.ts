import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ErroneousBidStatusBase {

//#region erroneousBidStatusId Prop
        @prop()
        erroneousBidStatusId : any;
//#endregion erroneousBidStatusId Prop


//#region eN_ErroneousBidStatusName Prop
        @required()
        @maxLength({value:500})
        eN_ErroneousBidStatusName : string;
//#endregion eN_ErroneousBidStatusName Prop


//#region fR_ErroneousBidStatusName Prop
        @maxLength({value:500})
        fR_ErroneousBidStatusName : string;
//#endregion fR_ErroneousBidStatusName Prop





}