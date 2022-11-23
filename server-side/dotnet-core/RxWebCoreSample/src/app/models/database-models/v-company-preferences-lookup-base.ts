import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vCompanyPreferencesLookupBase {

//#region companyPreferenceId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'companyPreferenceId', keyColumn: false})
        companyPreferenceId : any;
//#endregion companyPreferenceId Prop


//#region companyPreferencesDescription Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'companyPreferencesDescription', keyColumn: false})
        companyPreferencesDescription : string;
//#endregion companyPreferencesDescription Prop

}