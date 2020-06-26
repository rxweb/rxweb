import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobBase {

//#region jobId Prop
        @prop()
        jobId : number;
//#endregion jobId Prop


//#region buyerCompanyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerCompanyId : number;
//#endregion buyerCompanyId Prop


//#region buyerDepartmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerDepartmentId : number;
//#endregion buyerDepartmentId Prop


//#region buyerUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerUserId : number;
//#endregion buyerUserId Prop


//#region buyerJob Prop
        @maxLength({value:500})
        buyerJob : string;
//#endregion buyerJob Prop


//#region buyerJobDescription Prop
        @prop()
        buyerJobDescription : string;
//#endregion buyerJobDescription Prop


//#region vendorCompanyId Prop
        @prop()
        vendorCompanyId : number;
//#endregion vendorCompanyId Prop


//#region vendorDepartmentId Prop
        @prop()
        vendorDepartmentId : number;
//#endregion vendorDepartmentId Prop


//#region vendorUserId Prop
        @prop()
        vendorUserId : number;
//#endregion vendorUserId Prop


//#region parentJobId Prop
        @prop()
        parentJobId : number;
//#endregion parentJobId Prop


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
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @prop()
        updatedDateTime : any;
//#endregion updatedDateTime Prop


//#region currentSpecId Prop
        @prop()
        currentSpecId : number;
//#endregion currentSpecId Prop


//#region jobThreadId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobThreadId : number;
//#endregion jobThreadId Prop


//#region jobTypeId Prop
        @required()
        jobTypeId : any;
//#endregion jobTypeId Prop


//#region revision Prop
        @prop()
        revision : any;
//#endregion revision Prop


//#region originatingDepartmentId Prop
        @prop()
        originatingDepartmentId : number;
//#endregion originatingDepartmentId Prop


//#region projectId Prop
        @prop()
        projectId : number;
//#endregion projectId Prop





































































}