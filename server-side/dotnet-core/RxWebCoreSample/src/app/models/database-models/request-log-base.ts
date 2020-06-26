import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RequestLogBase {

//#region requestLogId Prop
        @prop()
        requestLogId : number;
//#endregion requestLogId Prop


//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region applicationModuleId Prop
        @prop()
        applicationModuleId : number;
//#endregion applicationModuleId Prop


//#region recordId Prop
        @maxLength({value:100})
        recordId : string;
//#endregion recordId Prop


//#region requestMethod Prop
        @required()
        @maxLength({value:10})
        requestMethod : string;
//#endregion requestMethod Prop


//#region serviceUri Prop
        @required()
        @maxLength({value:100})
        serviceUri : string;
//#endregion serviceUri Prop


//#region clientIPAddress Prop
        @maxLength({value:50})
        clientIPAddress : string;
//#endregion clientIPAddress Prop


//#region browserName Prop
        @maxLength({value:200})
        browserName : string;
//#endregion browserName Prop


//#region requestTime Prop
        @required()
        requestTime : Date;
//#endregion requestTime Prop


//#region totalDuration Prop
        @required()
        totalDuration : any;
//#endregion totalDuration Prop


//#region parameters Prop
        @required()
        parameters : string;
//#endregion parameters Prop


//#region contentLength Prop
        @prop()
        contentLength : number;
//#endregion contentLength Prop


//#region cookies Prop
        @prop()
        cookies : string;
//#endregion cookies Prop


//#region authorizationHeader Prop
        @prop()
        authorizationHeader : string;
//#endregion authorizationHeader Prop


//#region responseStatusCode Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        responseStatusCode : number;
//#endregion responseStatusCode Prop

}