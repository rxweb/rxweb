import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vVendorBase {

//#region vendorId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'vendorId', keyColumn: true})
        vendorId : number;
//#endregion vendorId Prop


//#region availableToBuyers Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'availableToBuyers', keyColumn: false})
        availableToBuyers : any;
//#endregion availableToBuyers Prop


//#region vendorDesignationId Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'vendorDesignationId', keyColumn: false})
        vendorDesignationId : any;
//#endregion vendorDesignationId Prop


//#region vendorStatusId Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'vendorStatusId', keyColumn: false})
        vendorStatusId : any;
//#endregion vendorStatusId Prop


//#region statusSetDate Prop
        @gridColumn({visible: true, columnIndex:4, allowSorting: true, headerKey: 'statusSetDate', keyColumn: false})
        statusSetDate : any;
//#endregion statusSetDate Prop


//#region emailDate Prop
        @gridColumn({visible: true, columnIndex:5, allowSorting: true, headerKey: 'emailDate', keyColumn: false})
        emailDate : any;
//#endregion emailDate Prop


//#region emailKey Prop
        @gridColumn({visible: true, columnIndex:6, allowSorting: true, headerKey: 'emailKey', keyColumn: false})
        emailKey : string;
//#endregion emailKey Prop


//#region acquiredByUserId Prop
        @gridColumn({visible: true, columnIndex:7, allowSorting: true, headerKey: 'acquiredByUserId', keyColumn: false})
        acquiredByUserId : any;
//#endregion acquiredByUserId Prop


//#region jobsInvited Prop
        @gridColumn({visible: true, columnIndex:8, allowSorting: true, headerKey: 'jobsInvited', keyColumn: false})
        jobsInvited : any;
//#endregion jobsInvited Prop


//#region jobsBid Prop
        @gridColumn({visible: true, columnIndex:9, allowSorting: true, headerKey: 'jobsBid', keyColumn: false})
        jobsBid : any;
//#endregion jobsBid Prop


//#region jobsNoBid Prop
        @gridColumn({visible: true, columnIndex:10, allowSorting: true, headerKey: 'jobsNoBid', keyColumn: false})
        jobsNoBid : any;
//#endregion jobsNoBid Prop


//#region jobsWon Prop
        @gridColumn({visible: true, columnIndex:11, allowSorting: true, headerKey: 'jobsWon', keyColumn: false})
        jobsWon : any;
//#endregion jobsWon Prop


//#region jobsEstimateRequested Prop
        @gridColumn({visible: true, columnIndex:12, allowSorting: true, headerKey: 'jobsEstimateRequested', keyColumn: false})
        jobsEstimateRequested : any;
//#endregion jobsEstimateRequested Prop


//#region jobsEstimateProvided Prop
        @gridColumn({visible: true, columnIndex:13, allowSorting: true, headerKey: 'jobsEstimateProvided', keyColumn: false})
        jobsEstimateProvided : any;
//#endregion jobsEstimateProvided Prop


//#region followupRequestDate Prop
        @gridColumn({visible: true, columnIndex:14, allowSorting: true, headerKey: 'followupRequestDate', keyColumn: false})
        followupRequestDate : any;
//#endregion followupRequestDate Prop


//#region activationDate Prop
        @gridColumn({visible: true, columnIndex:15, allowSorting: true, headerKey: 'activationDate', keyColumn: false})
        activationDate : any;
//#endregion activationDate Prop


//#region elynxxSourcingStatusId Prop
        @gridColumn({visible: true, columnIndex:16, allowSorting: true, headerKey: 'elynxxSourcingStatusId', keyColumn: false})
        elynxxSourcingStatusId : any;
//#endregion elynxxSourcingStatusId Prop


//#region isCompanyInfoDone Prop
        @gridColumn({visible: true, columnIndex:17, allowSorting: true, headerKey: 'isCompanyInfoDone', keyColumn: false})
        isCompanyInfoDone : boolean;
//#endregion isCompanyInfoDone Prop


//#region isBackgroundInfoDone Prop
        @gridColumn({visible: true, columnIndex:18, allowSorting: true, headerKey: 'isBackgroundInfoDone', keyColumn: false})
        isBackgroundInfoDone : boolean;
//#endregion isBackgroundInfoDone Prop


//#region isCertificationsDone Prop
        @gridColumn({visible: true, columnIndex:19, allowSorting: true, headerKey: 'isCertificationsDone', keyColumn: false})
        isCertificationsDone : boolean;
//#endregion isCertificationsDone Prop


//#region isEquipmentDone Prop
        @gridColumn({visible: true, columnIndex:20, allowSorting: true, headerKey: 'isEquipmentDone', keyColumn: false})
        isEquipmentDone : boolean;
//#endregion isEquipmentDone Prop


//#region isProductTypesDone Prop
        @gridColumn({visible: true, columnIndex:21, allowSorting: true, headerKey: 'isProductTypesDone', keyColumn: false})
        isProductTypesDone : boolean;
//#endregion isProductTypesDone Prop


//#region isCapabilitiesDone Prop
        @gridColumn({visible: true, columnIndex:22, allowSorting: true, headerKey: 'isCapabilitiesDone', keyColumn: false})
        isCapabilitiesDone : boolean;
//#endregion isCapabilitiesDone Prop


//#region isAttachmentsDone Prop
        @gridColumn({visible: true, columnIndex:23, allowSorting: true, headerKey: 'isAttachmentsDone', keyColumn: false})
        isAttachmentsDone : boolean;
//#endregion isAttachmentsDone Prop


//#region lastContact Prop
        @gridColumn({visible: true, columnIndex:24, allowSorting: true, headerKey: 'lastContact', keyColumn: false})
        lastContact : any;
//#endregion lastContact Prop


//#region createdBy Prop
        @gridColumn({visible: true, columnIndex:25, allowSorting: true, headerKey: 'createdBy', keyColumn: false})
        createdBy : any;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @gridColumn({visible: true, columnIndex:26, allowSorting: true, headerKey: 'createdDateTime', keyColumn: false})
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @gridColumn({visible: true, columnIndex:27, allowSorting: true, headerKey: 'updatedBy', keyColumn: false})
        updatedBy : any;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @gridColumn({visible: true, columnIndex:28, allowSorting: true, headerKey: 'updatedDateTime', keyColumn: false})
        updatedDateTime : any;
//#endregion updatedDateTime Prop

}