import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SentStatusBase {

//#region sentStatusId Prop
        @prop()
        sentStatusId : any;
//#endregion sentStatusId Prop


//#region sentStatusName Prop
        @required()
        @maxLength({value:100})
        sentStatusName : string;
//#endregion sentStatusName Prop


//#region oraUser Prop
        @required()
        @maxLength({value:100})
        oraUser : string;
//#endregion oraUser Prop


//#region modDate Prop
        @required()
        modDate : Date;
//#endregion modDate Prop



}