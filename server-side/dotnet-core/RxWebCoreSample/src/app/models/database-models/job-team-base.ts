import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobTeamBase {

//#region jobId Prop
        @prop()
        jobId : number;
//#endregion jobId Prop


//#region assignedUserId Prop
        @prop()
        assignedUserId : number;
//#endregion assignedUserId Prop


//#region stepRightId Prop
        @prop()
        stepRightId : number;
//#endregion stepRightId Prop


//#region roleCompanyMappingId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        roleCompanyMappingId : number;
//#endregion roleCompanyMappingId Prop


//#region serviceId Prop
        @required()
        serviceId : any;
//#endregion serviceId Prop


//#region jobTeamStatusId Prop
        @required()
        jobTeamStatusId : any;
//#endregion jobTeamStatusId Prop


//#region rowId Prop
        @required()
        rowId : any;
//#endregion rowId Prop


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