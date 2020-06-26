import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CompanyBase {

//#region companyId Prop
        @prop()
        companyId : number;
//#endregion companyId Prop


//#region companyName Prop
        @maxLength({value:100})
        companyName : string;
//#endregion companyName Prop


//#region speedDialNumber Prop
        @prop()
        speedDialNumber : number;
//#endregion speedDialNumber Prop



}