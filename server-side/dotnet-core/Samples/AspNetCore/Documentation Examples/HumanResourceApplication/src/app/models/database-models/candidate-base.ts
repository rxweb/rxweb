import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CandidateBase {

//#region candidateId Prop
        @prop()
        candidateId : number;
//#endregion candidateId Prop


//#region firstName Prop
        @required()
        @maxLength({value:100})
        firstName : string;
//#endregion firstName Prop


//#region emailId Prop
        @required()
        @maxLength({value:50})
        emailId : string;
//#endregion emailId Prop


//#region countryId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        countryId : number;
//#endregion countryId Prop


//#region designation Prop
        @required()
        @maxLength({value:50})
        designation : string;
//#endregion designation Prop


//#region experience Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        experience : number;
//#endregion experience Prop

}