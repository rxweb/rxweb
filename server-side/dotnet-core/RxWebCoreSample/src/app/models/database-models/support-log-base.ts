import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SupportLogBase {

//#region supportLogId Prop
        @prop()
        supportLogId : number;
//#endregion supportLogId Prop


//#region buyerId Prop
        @prop()
        buyerId : number;
//#endregion buyerId Prop


//#region vendorId Prop
        @prop()
        vendorId : number;
//#endregion vendorId Prop


//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region jobId Prop
        @prop()
        jobId : number;
//#endregion jobId Prop


//#region authorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        authorId : number;
//#endregion authorId Prop


//#region auditTypeId Prop
        @prop()
        auditTypeId : number;
//#endregion auditTypeId Prop


//#region auditSubject Prop
        @maxLength({value:200})
        auditSubject : string;
//#endregion auditSubject Prop


//#region auditText Prop
        @prop()
        auditText : string;
//#endregion auditText Prop


//#region auditDate Prop
        @required()
        auditDate : any;
//#endregion auditDate Prop


//#region supportTimeMinutes Prop
        @prop()
        supportTimeMinutes : any;
//#endregion supportTimeMinutes Prop


//#region supportTypeId Prop
        @prop()
        supportTypeId : any;
//#endregion supportTypeId Prop











}