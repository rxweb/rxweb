import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CandidateAvailabilityBase {

//#region candidateAvailabilityId Prop
        @prop()
        candidateAvailabilityId : number;
//#endregion candidateAvailabilityId Prop


//#region availableDate Prop
        @required()
        availableDate : any;
//#endregion availableDate Prop


//#region fromTime Prop
        @required()
        fromTime : any;
//#endregion fromTime Prop


//#region toTime Prop
        @required()
        toTime : any;
//#endregion toTime Prop


//#region candidateId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        candidateId : number;
//#endregion candidateId Prop

}