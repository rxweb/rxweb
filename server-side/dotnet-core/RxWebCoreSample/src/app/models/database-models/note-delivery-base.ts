import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class NoteDeliveryBase {

//#region noteId Prop
        @prop()
        noteId : number;
//#endregion noteId Prop


//#region recipientUserId Prop
        @prop()
        recipientUserId : number;
//#endregion recipientUserId Prop


//#region noteDeliveryStatusId Prop
        @required()
        noteDeliveryStatusId : any;
//#endregion noteDeliveryStatusId Prop


//#region deadlineDate Prop
        @prop()
        deadlineDate : Date;
//#endregion deadlineDate Prop


//#region actionName Prop
        @maxLength({value:4000})
        actionName : string;
//#endregion actionName Prop


//#region actionLink Prop
        @maxLength({value:4000})
        actionLink : string;
//#endregion actionLink Prop


//#region actionSuffix Prop
        @maxLength({value:4000})
        actionSuffix : string;
//#endregion actionSuffix Prop


//#region externalDeliveryMethod Prop
        @maxLength({value:4000})
        externalDeliveryMethod : string;
//#endregion externalDeliveryMethod Prop


//#region noteTypeId Prop
        @prop()
        noteTypeId : any;
//#endregion noteTypeId Prop


//#region viewed Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        viewed : number;
//#endregion viewed Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @required()
        updatedDateTime : any;
//#endregion updatedDateTime Prop







}