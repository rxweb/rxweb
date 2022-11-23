import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class FedexLoginLogBase {

//#region employeeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        employeeId : number;
//#endregion employeeId Prop


//#region name Prop
        @required()
        @maxLength({value:100})
        name : string;
//#endregion name Prop


//#region organizationCode Prop
        @required()
        @maxLength({value:20})
        organizationCode : string;
//#endregion organizationCode Prop


//#region operatingCompany Prop
        @required()
        @maxLength({value:20})
        operatingCompany : string;
//#endregion operatingCompany Prop


//#region managementLevel Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        managementLevel : number;
//#endregion managementLevel Prop


//#region address Prop
        @required()
        @maxLength({value:500})
        address : string;
//#endregion address Prop


//#region costCenterCode Prop
        @required()
        @maxLength({value:20})
        costCenterCode : string;
//#endregion costCenterCode Prop


//#region costCenterEmployeeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        costCenterEmployeeId : number;
//#endregion costCenterEmployeeId Prop


//#region isAdminUser Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        isAdminUser : number;
//#endregion isAdminUser Prop


//#region mgrEmployeeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        mgrEmployeeId : number;
//#endregion mgrEmployeeId Prop


//#region mgrName Prop
        @required()
        @maxLength({value:100})
        mgrName : string;
//#endregion mgrName Prop


//#region mgrOrganizationCode Prop
        @required()
        @maxLength({value:20})
        mgrOrganizationCode : string;
//#endregion mgrOrganizationCode Prop


//#region mgrOperatingCompany Prop
        @required()
        @maxLength({value:20})
        mgrOperatingCompany : string;
//#endregion mgrOperatingCompany Prop


//#region mgrManagementLevel Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        mgrManagementLevel : number;
//#endregion mgrManagementLevel Prop


//#region mgrAddress Prop
        @required()
        @maxLength({value:500})
        mgrAddress : string;
//#endregion mgrAddress Prop


//#region mgrCostCenterCode Prop
        @maxLength({value:20})
        mgrCostCenterCode : string;
//#endregion mgrCostCenterCode Prop


//#region loginDate Prop
        @required()
        loginDate : Date;
//#endregion loginDate Prop

}