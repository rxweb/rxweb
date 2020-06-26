import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorBase {

//#region vendorId Prop
        @prop()
        vendorId : number;
//#endregion vendorId Prop


//#region availableToBuyers Prop
        @prop()
        availableToBuyers : any;
//#endregion availableToBuyers Prop


//#region vendorDesignationId Prop
        @prop()
        vendorDesignationId : any;
//#endregion vendorDesignationId Prop


//#region vendorStatusId Prop
        @prop()
        vendorStatusId : any;
//#endregion vendorStatusId Prop


//#region statusSetDate Prop
        @prop()
        statusSetDate : any;
//#endregion statusSetDate Prop


//#region emailDate Prop
        @prop()
        emailDate : any;
//#endregion emailDate Prop


//#region emailKey Prop
        @maxLength({value:100})
        emailKey : string;
//#endregion emailKey Prop


//#region acquiredByUserId Prop
        @prop()
        acquiredByUserId : number;
//#endregion acquiredByUserId Prop


//#region jobsInvited Prop
        @prop()
        jobsInvited : number;
//#endregion jobsInvited Prop


//#region jobsBid Prop
        @prop()
        jobsBid : number;
//#endregion jobsBid Prop


//#region jobsNoBid Prop
        @prop()
        jobsNoBid : number;
//#endregion jobsNoBid Prop


//#region jobsWon Prop
        @prop()
        jobsWon : any;
//#endregion jobsWon Prop


//#region jobsEstimateRequested Prop
        @prop()
        jobsEstimateRequested : number;
//#endregion jobsEstimateRequested Prop


//#region jobsEstimateProvided Prop
        @prop()
        jobsEstimateProvided : number;
//#endregion jobsEstimateProvided Prop


//#region followupRequestDate Prop
        @prop()
        followupRequestDate : any;
//#endregion followupRequestDate Prop


//#region activationDate Prop
        @prop()
        activationDate : any;
//#endregion activationDate Prop


//#region elynxxSourcingStatusId Prop
        @prop()
        elynxxSourcingStatusId : any;
//#endregion elynxxSourcingStatusId Prop


//#region isCompanyInfoDone Prop
        @required()
        isCompanyInfoDone : boolean;
//#endregion isCompanyInfoDone Prop


//#region isBackgroundInfoDone Prop
        @required()
        isBackgroundInfoDone : boolean;
//#endregion isBackgroundInfoDone Prop


//#region isCertificationsDone Prop
        @required()
        isCertificationsDone : boolean;
//#endregion isCertificationsDone Prop


//#region isEquipmentDone Prop
        @required()
        isEquipmentDone : boolean;
//#endregion isEquipmentDone Prop


//#region isProductTypesDone Prop
        @required()
        isProductTypesDone : boolean;
//#endregion isProductTypesDone Prop


//#region isCapabilitiesDone Prop
        @required()
        isCapabilitiesDone : boolean;
//#endregion isCapabilitiesDone Prop


//#region isAttachmentsDone Prop
        @required()
        isAttachmentsDone : boolean;
//#endregion isAttachmentsDone Prop


//#region lastContact Prop
        @prop()
        lastContact : any;
//#endregion lastContact Prop


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