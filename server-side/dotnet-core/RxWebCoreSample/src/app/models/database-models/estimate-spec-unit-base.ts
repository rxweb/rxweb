import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EstimateSpecUnitBase {

//#region estimateSpecUnitId Prop
        @prop()
        estimateSpecUnitId : number;
//#endregion estimateSpecUnitId Prop


//#region estimateId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        estimateId : number;
//#endregion estimateId Prop


//#region specUnitId Prop
        @prop()
        specUnitId : number;
//#endregion specUnitId Prop


//#region unitOfIssue Prop
        @maxLength({value:4000})
        unitOfIssue : string;
//#endregion unitOfIssue Prop


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