import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DepartmentBase {

//#region departmentID Prop
        @prop()
        departmentID : number;
//#endregion departmentID Prop


//#region departmentName Prop
        @required()
        @maxLength({value:100})
        departmentName : string;
//#endregion departmentName Prop



}