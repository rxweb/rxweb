import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidTermAcceptanceBase {

//#region bidTermAcceptanceId Prop
        @prop()
        bidTermAcceptanceId : number;
//#endregion bidTermAcceptanceId Prop


//#region bidSessionId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidSessionId : number;
//#endregion bidSessionId Prop


//#region acceptUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        acceptUserId : number;
//#endregion acceptUserId Prop


//#region acceptLoginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        acceptLoginId : number;
//#endregion acceptLoginId Prop


//#region acceptDate Prop
        @required()
        acceptDate : Date;
//#endregion acceptDate Prop







}