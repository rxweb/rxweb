import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LogicalFileInstanceBase {

//#region logicalFileInstanceId Prop
        @prop()
        logicalFileInstanceId : number;
//#endregion logicalFileInstanceId Prop


//#region fileDescription Prop
        @maxLength({value:4000})
        fileDescription : string;
//#endregion fileDescription Prop


//#region fileAccessTypeId Prop
        @required()
        fileAccessTypeId : any;
//#endregion fileAccessTypeId Prop


//#region physicalFileId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        physicalFileId : number;
//#endregion physicalFileId Prop


//#region filename Prop
        @required()
        @maxLength({value:1000})
        filename : string;
//#endregion filename Prop


//#region filesize Prop
        @required()
        filesize : any;
//#endregion filesize Prop


//#region multipurposeInternetMailExtensionsType Prop
        @maxLength({value:1000})
        multipurposeInternetMailExtensionsType : string;
//#endregion multipurposeInternetMailExtensionsType Prop


//#region scanStatusTypeId Prop
        @required()
        scanStatusTypeId : any;
//#endregion scanStatusTypeId Prop


//#region scanStatus Prop
        @maxLength({value:4000})
        scanStatus : string;
//#endregion scanStatus Prop


//#region fileInstanceActionId Prop
        @required()
        fileInstanceActionId : any;
//#endregion fileInstanceActionId Prop


//#region actionUserName Prop
        @required()
        @maxLength({value:1000})
        actionUserName : string;
//#endregion actionUserName Prop


//#region actionUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        actionUserId : number;
//#endregion actionUserId Prop


//#region actionLoginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        actionLoginId : number;
//#endregion actionLoginId Prop


//#region notificationNoteId Prop
        @prop()
        notificationNoteId : number;
//#endregion notificationNoteId Prop


//#region priorLogicalFileInstanceId Prop
        @prop()
        priorLogicalFileInstanceId : number;
//#endregion priorLogicalFileInstanceId Prop


//#region logicalFileId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        logicalFileId : number;
//#endregion logicalFileId Prop


//#region uploadStart Prop
        @prop()
        uploadStart : Date;
//#endregion uploadStart Prop


//#region actionTimestamp Prop
        @prop()
        actionTimestamp : Date;
//#endregion actionTimestamp Prop























}