import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FileDownloadAuditBase {

//#region fileDownloadAuditId Prop
        @prop()
        fileDownloadAuditId : number;
//#endregion fileDownloadAuditId Prop


//#region logicalFileInstanceId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        logicalFileInstanceId : number;
//#endregion logicalFileInstanceId Prop


//#region downloadUsername Prop
        @required()
        @maxLength({value:1000})
        downloadUsername : string;
//#endregion downloadUsername Prop


//#region downloadUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        downloadUserId : number;
//#endregion downloadUserId Prop


//#region downloadLoginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        downloadLoginId : number;
//#endregion downloadLoginId Prop


//#region downloadStartDate Prop
        @required()
        downloadStartDate : Date;
//#endregion downloadStartDate Prop


//#region downloadEndTimestamp Prop
        @prop()
        downloadEndTimestamp : Date;
//#endregion downloadEndTimestamp Prop







}