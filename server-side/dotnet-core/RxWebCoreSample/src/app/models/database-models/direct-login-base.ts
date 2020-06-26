import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DirectLoginBase {

//#region directLoginId Prop
        @prop()
        directLoginId : number;
//#endregion directLoginId Prop


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
        @prop()
        jobId : number;
//#endregion jobId Prop


//#region jobStepId Prop
        @prop()
        jobStepId : number;
//#endregion jobStepId Prop


//#region directoryUserId Prop
        @prop()
        directoryUserId : number;
//#endregion directoryUserId Prop


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