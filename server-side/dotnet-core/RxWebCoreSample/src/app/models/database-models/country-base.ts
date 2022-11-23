import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CountryBase {

//#region countryId Prop
        @prop()
        countryId : any;
//#endregion countryId Prop


//#region eN_Country Prop
        @required()
        @maxLength({value:500})
        eN_Country : string;
//#endregion eN_Country Prop


//#region eN_PhoneEditMask Prop
        @required()
        @maxLength({value:500})
        eN_PhoneEditMask : string;
//#endregion eN_PhoneEditMask Prop


//#region fR_Country Prop
        @required()
        @maxLength({value:500})
        fR_Country : string;
//#endregion fR_Country Prop


//#region fR_PhoneEditMask Prop
        @required()
        @maxLength({value:500})
        fR_PhoneEditMask : string;
//#endregion fR_PhoneEditMask Prop





}