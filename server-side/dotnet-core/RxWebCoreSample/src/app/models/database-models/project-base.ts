import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ProjectBase {

//#region projectId Prop
        @prop()
        projectId : number;
//#endregion projectId Prop


//#region projectName Prop
        @required()
        projectName : string;
//#endregion projectName Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createDateTime Prop
        @prop()
        createDateTime : any;
//#endregion createDateTime Prop


//#region updatedBy Prop
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDataTime Prop
        @prop()
        updatedDataTime : any;
//#endregion updatedDataTime Prop


//#region projectStatusId Prop
        @required()
        projectStatusId : any;
//#endregion projectStatusId Prop









}