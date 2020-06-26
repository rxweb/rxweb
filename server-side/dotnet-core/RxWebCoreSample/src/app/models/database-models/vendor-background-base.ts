import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorBackgroundBase {

//#region vendorBackgroundId Prop
        @prop()
        vendorBackgroundId : number;
//#endregion vendorBackgroundId Prop


//#region vendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vendorId : number;
//#endregion vendorId Prop


//#region discloseInfo Prop
        @prop()
        discloseInfo : number;
//#endregion discloseInfo Prop


//#region numberOfEmployees Prop
        @maxLength({value:40})
        numberOfEmployees : string;
//#endregion numberOfEmployees Prop


//#region yearIncorporated Prop
        @maxLength({value:40})
        yearIncorporated : string;
//#endregion yearIncorporated Prop


//#region yearBusinessStarted Prop
        @maxLength({value:40})
        yearBusinessStarted : string;
//#endregion yearBusinessStarted Prop


//#region facilitySquareFeet Prop
        @maxLength({value:40})
        facilitySquareFeet : string;
//#endregion facilitySquareFeet Prop


//#region warehouseSquareFeet Prop
        @maxLength({value:40})
        warehouseSquareFeet : string;
//#endregion warehouseSquareFeet Prop


//#region productionSquareFeet Prop
        @maxLength({value:40})
        productionSquareFeet : string;
//#endregion productionSquareFeet Prop


//#region lastYearJobs Prop
        @maxLength({value:40})
        lastYearJobs : string;
//#endregion lastYearJobs Prop


//#region lastYearSales Prop
        @maxLength({value:40})
        lastYearSales : string;
//#endregion lastYearSales Prop


//#region dBRating Prop
        @maxLength({value:4000})
        dBRating : string;
//#endregion dBRating Prop


//#region dBNumber Prop
        @maxLength({value:4000})
        dBNumber : string;
//#endregion dBNumber Prop


//#region federalEmployeeIdnumber Prop
        @maxLength({value:4000})
        federalEmployeeIdnumber : string;
//#endregion federalEmployeeIdnumber Prop


//#region generalInfo Prop
        @prop()
        generalInfo : string;
//#endregion generalInfo Prop


//#region incorporationStateId Prop
        @prop()
        incorporationStateId : any;
//#endregion incorporationStateId Prop


//#region requestForReviewDate Prop
        @prop()
        requestForReviewDate : any;
//#endregion requestForReviewDate Prop


//#region requestForReviewUserId Prop
        @prop()
        requestForReviewUserId : number;
//#endregion requestForReviewUserId Prop


//#region paymentURL Prop
        @maxLength({value:4000})
        paymentURL : string;
//#endregion paymentURL Prop


//#region paymentTerms Prop
        @maxLength({value:4000})
        paymentTerms : string;
//#endregion paymentTerms Prop







}