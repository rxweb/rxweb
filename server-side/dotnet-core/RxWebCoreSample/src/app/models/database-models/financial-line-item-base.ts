import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FinancialLineItemBase {

//#region financialLineItemId Prop
        @prop()
        financialLineItemId : number;
//#endregion financialLineItemId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region financialLineItemTypeId Prop
        @required()
        financialLineItemTypeId : any;
//#endregion financialLineItemTypeId Prop


//#region financialLineItemStatusId Prop
        @required()
        financialLineItemStatusId : any;
//#endregion financialLineItemStatusId Prop


//#region buyerJobStepId Prop
        @prop()
        buyerJobStepId : number;
//#endregion buyerJobStepId Prop


//#region vendorJobStepId Prop
        @prop()
        vendorJobStepId : number;
//#endregion vendorJobStepId Prop


//#region amount Prop
        @prop()
        amount : number;
//#endregion amount Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region userInvoiceNumber Prop
        @maxLength({value:4000})
        userInvoiceNumber : string;
//#endregion userInvoiceNumber Prop


//#region activateDate Prop
        @prop()
        activateDate : Date;
//#endregion activateDate Prop


//#region htmlContractMod Prop
        @prop()
        htmlContractMod : any;
//#endregion htmlContractMod Prop


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

































}