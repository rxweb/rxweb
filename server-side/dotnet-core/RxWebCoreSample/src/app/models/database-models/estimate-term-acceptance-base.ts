import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateTermAcceptanceBase {

//#region estimateTermAcceptanceId Prop
        @prop()
        estimateTermAcceptanceId : number;
//#endregion estimateTermAcceptanceId Prop


//#region estimateId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        estimateId : number;
//#endregion estimateId Prop


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
        @prop()
        acceptDate : Date;
//#endregion acceptDate Prop







}