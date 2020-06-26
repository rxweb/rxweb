import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TermSetBase {

//#region termSetId Prop
        @prop()
        termSetId : number;
//#endregion termSetId Prop


//#region ownerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        ownerId : number;
//#endregion ownerId Prop


//#region termSetTypeId Prop
        @required()
        termSetTypeId : any;
//#endregion termSetTypeId Prop


//#region termAcceptanceTypeId Prop
        @required()
        termAcceptanceTypeId : any;
//#endregion termAcceptanceTypeId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region effectiveDate Prop
        @required()
        effectiveDate : Date;
//#endregion effectiveDate Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


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