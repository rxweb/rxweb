import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AdvertisingSpecialtyInstituteCompanyBase {

//#region companyId Prop
        @prop()
        companyId : number;
//#endregion companyId Prop


//#region departmentId Prop
        @prop()
        departmentId : number;
//#endregion departmentId Prop

}