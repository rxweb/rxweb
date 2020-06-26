import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DirectJobLoginBase {

//#region directJobLoginId Prop
        @prop()
        directJobLoginId : number;
//#endregion directJobLoginId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region loginUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        loginUserId : number;
//#endregion loginUserId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop


//#region validationValue Prop
        @required()
        validationValue : number;
//#endregion validationValue Prop


//#region createDate Prop
        @required()
        createDate : Date;
//#endregion createDate Prop


//#region lastAccessDate Prop
        @prop()
        lastAccessDate : Date;
//#endregion lastAccessDate Prop









}