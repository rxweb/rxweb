import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MessageBase {

//#region messageId Prop
        @prop()
        messageId : number;
//#endregion messageId Prop


//#region messageDetail Prop
        @maxLength({value:4000})
        messageDetail : string;
//#endregion messageDetail Prop


//#region topicId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        topicId : number;
//#endregion topicId Prop


//#region authorUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        authorUserId : number;
//#endregion authorUserId Prop


//#region authorLoginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        authorLoginId : number;
//#endregion authorLoginId Prop


//#region postTimestamp Prop
        @prop()
        postTimestamp : Date;
//#endregion postTimestamp Prop





}