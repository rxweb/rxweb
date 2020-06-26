import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RoleCompanyMappingBase {

//#region roleCompanyMappingId Prop
        @prop()
        roleCompanyMappingId : number;
//#endregion roleCompanyMappingId Prop


//#region serviceId Prop
        @prop()
        serviceId : any;
//#endregion serviceId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop


//#region roleId Prop
        @prop()
        roleId : number;
//#endregion roleId Prop


//#region roleGroupId Prop
        @prop()
        roleGroupId : any;
//#endregion roleGroupId Prop


//#region companyId Prop
        @prop()
        companyId : number;
//#endregion companyId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop















}