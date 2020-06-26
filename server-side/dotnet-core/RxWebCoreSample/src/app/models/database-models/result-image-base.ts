import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ResultImageBase {

//#region resultImageId Prop
        @prop()
        resultImageId : number;
//#endregion resultImageId Prop


//#region invitationForBidId Prop
        @prop()
        invitationForBidId : number;
//#endregion invitationForBidId Prop


//#region scanDate Prop
        @prop()
        scanDate : Date;
//#endregion scanDate Prop


//#region fileSize Prop
        @prop()
        fileSize : number;
//#endregion fileSize Prop


//#region pageCount Prop
        @prop()
        pageCount : number;
//#endregion pageCount Prop


//#region checkSum Prop
        @prop()
        checkSum : number;
//#endregion checkSum Prop


//#region image Prop
        @prop()
        image : any;
//#endregion image Prop



}