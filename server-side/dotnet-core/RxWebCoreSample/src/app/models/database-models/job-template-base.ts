import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobTemplateBase {

//#region jobId Prop
        @prop()
        jobId : number;
//#endregion jobId Prop


//#region jobGroupId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobGroupId : number;
//#endregion jobGroupId Prop


//#region jobTemplateStatusId Prop
        @required()
        jobTemplateStatusId : any;
//#endregion jobTemplateStatusId Prop


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