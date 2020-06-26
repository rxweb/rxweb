import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecHistoryBase {

//#region specId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specId : number;
//#endregion specId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region specStatusId Prop
        @prop()
        specStatusId : number;
//#endregion specStatusId Prop


//#region workingSpecId Prop
        @prop()
        workingSpecId : number;
//#endregion workingSpecId Prop


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