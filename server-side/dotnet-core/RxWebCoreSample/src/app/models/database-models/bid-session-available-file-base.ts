import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidSessionAvailableFileBase {

//#region bidSessionAvailableFileId Prop
        @prop()
        bidSessionAvailableFileId : number;
//#endregion bidSessionAvailableFileId Prop


//#region bidSessionId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidSessionId : number;
//#endregion bidSessionId Prop


//#region logicalFileInstanceId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        logicalFileInstanceId : number;
//#endregion logicalFileInstanceId Prop





}