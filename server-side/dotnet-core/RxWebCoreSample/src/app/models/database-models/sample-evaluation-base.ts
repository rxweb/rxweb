import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SampleEvaluationBase {

//#region sampleEvaluationId Prop
        @prop()
        sampleEvaluationId : number;
//#endregion sampleEvaluationId Prop


//#region componentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        componentId : number;
//#endregion componentId Prop


//#region vendorId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        vendorId : number;
//#endregion vendorId Prop


//#region evaluationCompanyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        evaluationCompanyId : number;
//#endregion evaluationCompanyId Prop


//#region evaluationUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        evaluationUserId : number;
//#endregion evaluationUserId Prop


//#region evaluationLoginId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        evaluationLoginId : number;
//#endregion evaluationLoginId Prop


//#region evaluationDate Prop
        @required()
        evaluationDate : Date;
//#endregion evaluationDate Prop


//#region sampleDescription Prop
        @maxLength({value:1000})
        sampleDescription : string;
//#endregion sampleDescription Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region buyerVendorComponentStatusId Prop
        @required()
        buyerVendorComponentStatusId : any;
//#endregion buyerVendorComponentStatusId Prop


//#region qualityId Prop
        @prop()
        qualityId : any;
//#endregion qualityId Prop


//#region processColor Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        processColor : number;
//#endregion processColor Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop

















}