import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class UserDepartmentRoleBase {

//#region userDepartmentRoleId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userDepartmentRoleId : number;
//#endregion userDepartmentRoleId Prop


//#region departmentId Prop
        @prop()
        departmentId : number;
//#endregion departmentId Prop


//#region serviceId Prop
        @prop()
        serviceId : any;
//#endregion serviceId Prop


//#region roleCompanyMappingId Prop
        @prop()
        roleCompanyMappingId : number;
//#endregion roleCompanyMappingId Prop


//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region providerDepartmentId Prop
        @prop()
        providerDepartmentId : number;
//#endregion providerDepartmentId Prop


//#region roleStatusId Prop
        @required()
        roleStatusId : any;
//#endregion roleStatusId Prop


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