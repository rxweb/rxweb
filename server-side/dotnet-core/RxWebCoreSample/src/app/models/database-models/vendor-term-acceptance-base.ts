import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorTermAcceptanceBase {

//#region vendorTermAcceptanceId Prop
        @prop()
        vendorTermAcceptanceId : number;
//#endregion vendorTermAcceptanceId Prop


//#region termSetId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        termSetId : number;
//#endregion termSetId Prop


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