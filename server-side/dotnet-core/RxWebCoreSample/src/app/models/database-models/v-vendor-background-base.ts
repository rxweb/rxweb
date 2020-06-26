import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vVendorBackgroundBase {

//#region vendorBackgroundId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'vendorBackgroundId', keyColumn: true})
        vendorBackgroundId : number;
//#endregion vendorBackgroundId Prop


//#region vendorId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'vendorId', keyColumn: false})
        vendorId : number;
//#endregion vendorId Prop


//#region discloseInfo Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'discloseInfo', keyColumn: false})
        discloseInfo : any;
//#endregion discloseInfo Prop


//#region numberOfEmployees Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'numberOfEmployees', keyColumn: false})
        numberOfEmployees : string;
//#endregion numberOfEmployees Prop


//#region yearIncorporated Prop
        @gridColumn({visible: true, columnIndex:4, allowSorting: true, headerKey: 'yearIncorporated', keyColumn: false})
        yearIncorporated : string;
//#endregion yearIncorporated Prop


//#region yearBusinessStarted Prop
        @gridColumn({visible: true, columnIndex:5, allowSorting: true, headerKey: 'yearBusinessStarted', keyColumn: false})
        yearBusinessStarted : string;
//#endregion yearBusinessStarted Prop


//#region facilitySquareFeet Prop
        @gridColumn({visible: true, columnIndex:6, allowSorting: true, headerKey: 'facilitySquareFeet', keyColumn: false})
        facilitySquareFeet : string;
//#endregion facilitySquareFeet Prop


//#region warehouseSquareFeet Prop
        @gridColumn({visible: true, columnIndex:7, allowSorting: true, headerKey: 'warehouseSquareFeet', keyColumn: false})
        warehouseSquareFeet : string;
//#endregion warehouseSquareFeet Prop


//#region productionSquareFeet Prop
        @gridColumn({visible: true, columnIndex:8, allowSorting: true, headerKey: 'productionSquareFeet', keyColumn: false})
        productionSquareFeet : string;
//#endregion productionSquareFeet Prop


//#region lastYearJobs Prop
        @gridColumn({visible: true, columnIndex:9, allowSorting: true, headerKey: 'lastYearJobs', keyColumn: false})
        lastYearJobs : string;
//#endregion lastYearJobs Prop


//#region lastYearSales Prop
        @gridColumn({visible: true, columnIndex:10, allowSorting: true, headerKey: 'lastYearSales', keyColumn: false})
        lastYearSales : string;
//#endregion lastYearSales Prop


//#region dBRating Prop
        @gridColumn({visible: true, columnIndex:11, allowSorting: true, headerKey: 'dBRating', keyColumn: false})
        dBRating : string;
//#endregion dBRating Prop


//#region dBNumber Prop
        @gridColumn({visible: true, columnIndex:12, allowSorting: true, headerKey: 'dBNumber', keyColumn: false})
        dBNumber : string;
//#endregion dBNumber Prop


//#region federalEmployeeIdnumber Prop
        @gridColumn({visible: true, columnIndex:13, allowSorting: true, headerKey: 'federalEmployeeIdnumber', keyColumn: false})
        federalEmployeeIdnumber : string;
//#endregion federalEmployeeIdnumber Prop


//#region generalInfo Prop
        @gridColumn({visible: true, columnIndex:14, allowSorting: true, headerKey: 'generalInfo', keyColumn: false})
        generalInfo : string;
//#endregion generalInfo Prop


//#region incorporationStateId Prop
        @gridColumn({visible: true, columnIndex:15, allowSorting: true, headerKey: 'incorporationStateId', keyColumn: false})
        incorporationStateId : any;
//#endregion incorporationStateId Prop


//#region requestForReviewDate Prop
        @gridColumn({visible: true, columnIndex:16, allowSorting: true, headerKey: 'requestForReviewDate', keyColumn: false})
        requestForReviewDate : any;
//#endregion requestForReviewDate Prop


//#region requestForReviewUserId Prop
        @gridColumn({visible: true, columnIndex:17, allowSorting: true, headerKey: 'requestForReviewUserId', keyColumn: false})
        requestForReviewUserId : any;
//#endregion requestForReviewUserId Prop


//#region paymentURL Prop
        @gridColumn({visible: true, columnIndex:18, allowSorting: true, headerKey: 'paymentURL', keyColumn: false})
        paymentURL : string;
//#endregion paymentURL Prop


//#region paymentTerms Prop
        @gridColumn({visible: true, columnIndex:19, allowSorting: true, headerKey: 'paymentTerms', keyColumn: false})
        paymentTerms : string;
//#endregion paymentTerms Prop

}