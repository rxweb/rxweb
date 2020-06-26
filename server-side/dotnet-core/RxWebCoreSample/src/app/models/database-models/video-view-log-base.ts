import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VideoViewLogBase {

//#region videoViewLogId Prop
        @prop()
        videoViewLogId : number;
//#endregion videoViewLogId Prop


//#region videoId Prop
        @required()
        @maxLength({value:100})
        videoId : string;
//#endregion videoId Prop


//#region percentViewed Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        percentViewed : number;
//#endregion percentViewed Prop


//#region viewUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        viewUserId : number;
//#endregion viewUserId Prop


//#region viewLoginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        viewLoginId : number;
//#endregion viewLoginId Prop


//#region viewTimestamp Prop
        @required()
        viewTimestamp : Date;
//#endregion viewTimestamp Prop

}