import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ExceptionLogBase {

//#region exceptionLogId Prop
        @prop()
        exceptionLogId : number;
//#endregion exceptionLogId Prop


//#region application Prop
        @required()
        @maxLength({value:4000})
        application : string;
//#endregion application Prop


//#region routineName Prop
        @maxLength({value:4000})
        routineName : string;
//#endregion routineName Prop


//#region exceptionRoutineName Prop
        @required()
        @maxLength({value:4000})
        exceptionRoutineName : string;
//#endregion exceptionRoutineName Prop


//#region exceptionClass Prop
        @required()
        @maxLength({value:4000})
        exceptionClass : string;
//#endregion exceptionClass Prop


//#region exceptionMessage Prop
        @required()
        @maxLength({value:4000})
        exceptionMessage : string;
//#endregion exceptionMessage Prop


//#region callStack Prop
        @required()
        @maxLength({value:4000})
        callStack : string;
//#endregion callStack Prop


//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region loginId Prop
        @prop()
        loginId : number;
//#endregion loginId Prop


//#region departmentId Prop
        @prop()
        departmentId : number;
//#endregion departmentId Prop


//#region eventDate Prop
        @required()
        eventDate : Date;
//#endregion eventDate Prop


//#region machineName Prop
        @required()
        @maxLength({value:4000})
        machineName : string;
//#endregion machineName Prop


//#region userAgent Prop
        @maxLength({value:4000})
        userAgent : string;
//#endregion userAgent Prop


//#region query Prop
        @maxLength({value:4000})
        query : string;
//#endregion query Prop


//#region cookie Prop
        @maxLength({value:4000})
        cookie : string;
//#endregion cookie Prop


//#region content Prop
        @prop()
        content : string;
//#endregion content Prop


//#region exceptionType Prop
        @maxLength({value:200})
        exceptionType : string;
//#endregion exceptionType Prop

}