import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidSessionNonDisclosureAgreementBase {

//#region bidSessionNonDisclosureAgreementId Prop
        @prop()
        bidSessionNonDisclosureAgreementId : number;
//#endregion bidSessionNonDisclosureAgreementId Prop


//#region bidSessionId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidSessionId : number;
//#endregion bidSessionId Prop


//#region nonDisclosureAgreementDate Prop
        @required()
        nonDisclosureAgreementDate : Date;
//#endregion nonDisclosureAgreementDate Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region loginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        loginId : number;
//#endregion loginId Prop







}