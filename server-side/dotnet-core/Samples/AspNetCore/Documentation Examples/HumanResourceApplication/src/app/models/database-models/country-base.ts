import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CountryBase {

//#region countryId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        countryId : number;
//#endregion countryId Prop


//#region countryName Prop
        @required()
        @maxLength({value:100})
        countryName : string;
//#endregion countryName Prop


//#region statusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusId : number;
//#endregion statusId Prop


//#region languageId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        languageId : number;
//#endregion languageId Prop

}