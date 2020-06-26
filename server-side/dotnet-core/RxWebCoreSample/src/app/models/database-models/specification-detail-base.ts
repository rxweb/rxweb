import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecificationDetailBase {

//#region specificationDetailId Prop
        @prop()
        specificationDetailId : number;
//#endregion specificationDetailId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region specStatusId Prop
        @prop()
        specStatusId : any;
//#endregion specStatusId Prop


//#region workingSpecificationId Prop
        @prop()
        workingSpecificationId : number;
//#endregion workingSpecificationId Prop







































}