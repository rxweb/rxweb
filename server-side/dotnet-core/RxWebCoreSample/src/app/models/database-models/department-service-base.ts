import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DepartmentServiceBase {

//#region departmentServiceId Prop
        @prop()
        departmentServiceId : number;
//#endregion departmentServiceId Prop


//#region departmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        departmentId : number;
//#endregion departmentId Prop


//#region providerDepartmentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        providerDepartmentId : number;
//#endregion providerDepartmentId Prop


//#region serviceId Prop
        @required()
        serviceId : any;
//#endregion serviceId Prop


//#region serviceStatusId Prop
        @required()
        serviceStatusId : any;
//#endregion serviceStatusId Prop


//#region contractStatusId Prop
        @prop()
        contractStatusId : any;
//#endregion contractStatusId Prop


//#region isRequiredRoles Prop
        @prop()
        isRequiredRoles : boolean;
//#endregion isRequiredRoles Prop


//#region agentId Prop
        @prop()
        agentId : number;
//#endregion agentId Prop


//#region providerAgentId Prop
        @prop()
        providerAgentId : number;
//#endregion providerAgentId Prop


//#region customText Prop
        @maxLength({value:500})
        customText : string;
//#endregion customText Prop


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