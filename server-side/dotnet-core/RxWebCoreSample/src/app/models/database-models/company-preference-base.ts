import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CompanyPreferenceBase {

//#region companyPreferenceId Prop
        @prop()
        companyPreferenceId : any;
//#endregion companyPreferenceId Prop


//#region companyPreferencesDescription Prop
        @maxLength({value:4000})
        companyPreferencesDescription : string;
//#endregion companyPreferencesDescription Prop


//#region manifestConstant Prop
        @maxLength({value:100})
        manifestConstant : string;
//#endregion manifestConstant Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop



}