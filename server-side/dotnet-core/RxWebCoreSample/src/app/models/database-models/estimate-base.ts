import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateBase {

//#region estimateId Prop
        @prop()
        estimateId : number;
//#endregion estimateId Prop


//#region jobStepId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobStepId : number;
//#endregion jobStepId Prop


//#region estimateScheduleTypeId Prop
        @required()
        estimateScheduleTypeId : any;
//#endregion estimateScheduleTypeId Prop


//#region deliverDaysFromAward Prop
        @prop()
        deliverDaysFromAward : number;
//#endregion deliverDaysFromAward Prop


//#region deliverDate Prop
        @prop()
        deliverDate : Date;
//#endregion deliverDate Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @required()
        updatedDateTime : any;
//#endregion updatedDateTime Prop


//#region htmlId Prop
        @prop()
        htmlId : number;
//#endregion htmlId Prop


//#region nonDisclosureAgreementTerms Prop
        @prop()
        nonDisclosureAgreementTerms : string;
//#endregion nonDisclosureAgreementTerms Prop





















}