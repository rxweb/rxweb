import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class NonDisclosureAgreementEstimateAcceptBase {

//#region nonDisclosureAgreementEstimateAcceptId Prop
        @prop()
        nonDisclosureAgreementEstimateAcceptId : number;
//#endregion nonDisclosureAgreementEstimateAcceptId Prop


//#region nonDisclosureAgreementDate Prop
        @required()
        nonDisclosureAgreementDate : Date;
//#endregion nonDisclosureAgreementDate Prop


//#region estimateUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        estimateUserId : number;
//#endregion estimateUserId Prop


//#region estimateId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        estimateId : number;
//#endregion estimateId Prop


//#region createdBy Prop
        @prop()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @prop()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @prop()
        updatedDateTime : any;
//#endregion updatedDateTime Prop





}