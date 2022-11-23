import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ResourceAcquiredJobBase {

//#region resourceAcquiredJobId Prop
        @prop()
        resourceAcquiredJobId : number;
//#endregion resourceAcquiredJobId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region resourceUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        resourceUserId : number;
//#endregion resourceUserId Prop


//#region acquiredByUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        acquiredByUserId : number;
//#endregion acquiredByUserId Prop


//#region acquiredDate Prop
        @required()
        acquiredDate : Date;
//#endregion acquiredDate Prop







}