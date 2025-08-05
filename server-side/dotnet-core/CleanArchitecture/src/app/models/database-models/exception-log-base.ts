import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ExceptionLogBase {

//#region exceptionLogId Prop
        @prop()
        exceptionLogId : number;
//#endregion exceptionLogId Prop


//#region traceIdentifier Prop
        @required()
        @maxLength({value:100})
        traceIdentifier : string;
//#endregion traceIdentifier Prop


//#region message Prop
        @required()
        @maxLength({value:500})
        message : string;
//#endregion message Prop


//#region exceptionType Prop
        @required()
        @maxLength({value:200})
        exceptionType : string;
//#endregion exceptionType Prop


//#region exceptionSource Prop
        @required()
        exceptionSource : string;
//#endregion exceptionSource Prop


//#region stackTrace Prop
        @required()
        stackTrace : string;
//#endregion stackTrace Prop


//#region innerExceptionMessage Prop
        @maxLength({value:200})
        innerExceptionMessage : string;
//#endregion innerExceptionMessage Prop


//#region innerExceptionStackTrace Prop
        @prop()
        innerExceptionStackTrace : string;
//#endregion innerExceptionStackTrace Prop


//#region requestBody Prop
        @prop()
        requestBody : string;
//#endregion requestBody Prop


//#region createdDate Prop
        @required()
        createdDate : any;
//#endregion createdDate Prop

}