import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class EmployeeBase {

//#region employeeID Prop
        @prop()
        employeeID : number;
//#endregion employeeID Prop


//#region employeeName Prop
        @required()
        @maxLength({value:100})
        employeeName : string;
//#endregion employeeName Prop


//#region departmentID Prop
        @prop()
        departmentID : number;
//#endregion departmentID Prop



}