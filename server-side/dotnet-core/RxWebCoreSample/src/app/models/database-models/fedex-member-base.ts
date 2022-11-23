import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FedexMemberBase {

//#region employeeId Prop
        @prop()
        employeeId : number;
//#endregion employeeId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region name Prop
        @required()
        @maxLength({value:100})
        name : string;
//#endregion name Prop


//#region addressLine Prop
        @maxLength({value:500})
        addressLine : string;
//#endregion addressLine Prop


//#region costCenterCode Prop
        @maxLength({value:20})
        costCenterCode : string;
//#endregion costCenterCode Prop


//#region costCenterEmployeeId Prop
        @prop()
        costCenterEmployeeId : number;
//#endregion costCenterEmployeeId Prop


//#region managementLevel Prop
        @prop()
        managementLevel : number;
//#endregion managementLevel Prop


//#region operatingCompany Prop
        @maxLength({value:20})
        operatingCompany : string;
//#endregion operatingCompany Prop


//#region organizationCode Prop
        @maxLength({value:20})
        organizationCode : string;
//#endregion organizationCode Prop


//#region managerEmployeeId Prop
        @prop()
        managerEmployeeId : number;
//#endregion managerEmployeeId Prop


//#region isAdminUser Prop
        @required()
        isAdminUser : boolean;
//#endregion isAdminUser Prop

}