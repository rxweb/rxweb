import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidSessionFileAttachmentBase {

//#region bidSessionFileAttachmentId Prop
        @prop()
        bidSessionFileAttachmentId : number;
//#endregion bidSessionFileAttachmentId Prop


//#region bidSessionBidderId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidSessionBidderId : number;
//#endregion bidSessionBidderId Prop


//#region logicalFileId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        logicalFileId : number;
//#endregion logicalFileId Prop





}