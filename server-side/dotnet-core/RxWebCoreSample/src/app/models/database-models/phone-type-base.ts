import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PhoneTypeBase {

//#region phoneTypeId Prop
        @prop()
        phoneTypeId : any;
//#endregion phoneTypeId Prop


//#region eN_PhoneTypeName Prop
        @required()
        @maxLength({value:500})
        eN_PhoneTypeName : string;
//#endregion eN_PhoneTypeName Prop


//#region fR_PhoneTypeName Prop
        @maxLength({value:500})
        fR_PhoneTypeName : string;
//#endregion fR_PhoneTypeName Prop



}