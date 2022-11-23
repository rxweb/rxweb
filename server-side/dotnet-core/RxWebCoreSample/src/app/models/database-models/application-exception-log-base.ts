import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ApplicationExceptionLogBase {

//#region applicationExceptionLogId Prop
        @prop()
        applicationExceptionLogId : number;
//#endregion applicationExceptionLogId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region applicationTimeZoneId Prop
        @prop()
        applicationTimeZoneId : number;
//#endregion applicationTimeZoneId Prop


//#region applicationModuleId Prop
        @prop()
        applicationModuleId : number;
//#endregion applicationModuleId Prop


//#region url Prop
        @required()
        @maxLength({value:200})
        url : string;
//#endregion url Prop


//#region referrerURL Prop
        @required()
        @maxLength({value:100})
        referrerURL : string;
//#endregion referrerURL Prop


//#region requestMethod Prop
        @maxLength({value:10})
        requestMethod : string;
//#endregion requestMethod Prop


//#region message Prop
        @required()
        message : string;
//#endregion message Prop


//#region exceptionType Prop
        @required()
        @maxLength({value:200})
        exceptionType : string;
//#endregion exceptionType Prop


//#region exceptionTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        exceptionTypeId : number;
//#endregion exceptionTypeId Prop


//#region exceptionSource Prop
        @required()
        @maxLength({value:500})
        exceptionSource : string;
//#endregion exceptionSource Prop


//#region stackTrace Prop
        @required()
        stackTrace : string;
//#endregion stackTrace Prop


//#region innerException Prop
        @required()
        innerException : string;
//#endregion innerException Prop


//#region exceptionDate Prop
        @required()
        exceptionDate : Date;
//#endregion exceptionDate Prop


//#region severity Prop
        @prop()
        severity : number;
//#endregion severity Prop


//#region iPAddress Prop
        @required()
        iPAddress : string;
//#endregion iPAddress Prop

}