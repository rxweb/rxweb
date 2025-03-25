import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RequestTraceBase {

//#region traceId Prop
        @prop()
        traceId : number;
//#endregion traceId Prop


//#region traceIdentifier Prop
        @required()
        @maxLength({value:100})
        traceIdentifier : string;
//#endregion traceIdentifier Prop


//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region traceType Prop
        @required()
        @maxLength({value:10})
        traceType : string;
//#endregion traceType Prop


//#region traceTitle Prop
        @required()
        @maxLength({value:200})
        traceTitle : string;
//#endregion traceTitle Prop


//#region uri Prop
        @required()
        @maxLength({value:1024})
        uri : string;
//#endregion uri Prop


//#region verb Prop
        @required()
        @maxLength({value:10})
        verb : string;
//#endregion verb Prop


//#region clientIp Prop
        @required()
        @maxLength({value:50})
        clientIp : string;
//#endregion clientIp Prop


//#region requestHeader Prop
        @required()
        requestHeader : string;
//#endregion requestHeader Prop


//#region responseHeader Prop
        @required()
        responseHeader : string;
//#endregion responseHeader Prop


//#region statusCode Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusCode : number;
//#endregion statusCode Prop


//#region inTime Prop
        @required()
        inTime : any;
//#endregion inTime Prop


//#region outTime Prop
        @required()
        outTime : any;
//#endregion outTime Prop

}