import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CompanyVolumeMartBase {

//#region serviceFeeTermsId Prop
        @prop()
        serviceFeeTermsId : number;
//#endregion serviceFeeTermsId Prop


//#region effectiveMonth Prop
        @prop()
        effectiveMonth : Date;
//#endregion effectiveMonth Prop


//#region volume Prop
        @required()
        volume : number;
//#endregion volume Prop



}