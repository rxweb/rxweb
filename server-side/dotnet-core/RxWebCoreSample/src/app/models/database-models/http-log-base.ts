import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class HttpLogBase {

//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region loginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        loginId : number;
//#endregion loginId Prop


//#region eventDate Prop
        @required()
        eventDate : Date;
//#endregion eventDate Prop


//#region sessionKey Prop
        @required()
        @maxLength({value:4000})
        sessionKey : string;
//#endregion sessionKey Prop


//#region dLL Prop
        @required()
        @maxLength({value:4000})
        dLL : string;
//#endregion dLL Prop


//#region server Prop
        @required()
        @maxLength({value:4000})
        server : string;
//#endregion server Prop


//#region queryValues Prop
        @required()
        @maxLength({value:4000})
        queryValues : string;
//#endregion queryValues Prop


//#region browser Prop
        @required()
        @maxLength({value:4000})
        browser : string;
//#endregion browser Prop


//#region host Prop
        @required()
        @maxLength({value:4000})
        host : string;
//#endregion host Prop


//#region scriptName Prop
        @required()
        @maxLength({value:4000})
        scriptName : string;
//#endregion scriptName Prop


//#region pathInfo Prop
        @required()
        @maxLength({value:4000})
        pathInfo : string;
//#endregion pathInfo Prop


//#region authorization Prop
        @required()
        @maxLength({value:4000})
        authorization : string;
//#endregion authorization Prop


//#region referrer Prop
        @required()
        @maxLength({value:4000})
        referrer : string;
//#endregion referrer Prop


//#region httpLogId Prop
        @prop()
        httpLogId : number;
//#endregion httpLogId Prop


//#region ntStartTime Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        ntStartTime : number;
//#endregion ntStartTime Prop


//#region ntEndTime Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        ntEndTime : number;
//#endregion ntEndTime Prop


//#region vk Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vk : number;
//#endregion vk Prop


//#region contentFields Prop
        @required()
        contentFields : string;
//#endregion contentFields Prop


//#region commandStart Prop
        @required()
        commandStart : Date;
//#endregion commandStart Prop


//#region elapsedMilliSeconds Prop
        @required()
        elapsedMilliSeconds : any;
//#endregion elapsedMilliSeconds Prop

}