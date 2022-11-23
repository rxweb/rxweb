import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecUnitBase {

//#region specUnitId Prop
        @prop()
        specUnitId : number;
//#endregion specUnitId Prop


//#region specId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specId : number;
//#endregion specId Prop


//#region unitOfIssue Prop
        @maxLength({value:4000})
        unitOfIssue : string;
//#endregion unitOfIssue Prop


//#region unitOfIssueInstructions Prop
        @maxLength({value:4000})
        unitOfIssueInstructions : string;
//#endregion unitOfIssueInstructions Prop


//#region baseUnit Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        baseUnit : number;
//#endregion baseUnit Prop


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