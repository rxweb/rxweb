import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BulkNotifyBase {

//#region bulkNotifyId Prop
        @prop()
        bulkNotifyId : number;
//#endregion bulkNotifyId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region bulkNotifyTypeId Prop
        @required()
        bulkNotifyTypeId : any;
//#endregion bulkNotifyTypeId Prop


//#region bulkNotifySelectionTypeId Prop
        @required()
        bulkNotifySelectionTypeId : any;
//#endregion bulkNotifySelectionTypeId Prop


//#region description Prop
        @required()
        @maxLength({value:200})
        description : string;
//#endregion description Prop


//#region notificationMessage Prop
        @required()
        @maxLength({value:4000})
        notificationMessage : string;
//#endregion notificationMessage Prop


//#region creationUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        creationUserId : number;
//#endregion creationUserId Prop


//#region createDate Prop
        @required()
        createDate : Date;
//#endregion createDate Prop


//#region approvalUserId Prop
        @prop()
        approvalUserId : number;
//#endregion approvalUserId Prop


//#region approveDate Prop
        @prop()
        approveDate : Date;
//#endregion approveDate Prop


//#region scheduledPublishDate Prop
        @prop()
        scheduledPublishDate : Date;
//#endregion scheduledPublishDate Prop


//#region publishedDate Prop
        @prop()
        publishedDate : Date;
//#endregion publishedDate Prop


//#region expireDate Prop
        @prop()
        expireDate : Date;
//#endregion expireDate Prop













}