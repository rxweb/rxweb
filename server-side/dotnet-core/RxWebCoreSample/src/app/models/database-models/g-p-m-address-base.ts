import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class GPMAddressBase {

//#region companyId Prop
        @prop()
        companyId : number;
//#endregion companyId Prop


//#region addressId Prop
        @prop()
        addressId : number;
//#endregion addressId Prop


//#region description Prop
        @maxLength({value:100})
        description : string;
//#endregion description Prop


//#region address1 Prop
        @maxLength({value:100})
        address1 : string;
//#endregion address1 Prop


//#region address2 Prop
        @maxLength({value:100})
        address2 : string;
//#endregion address2 Prop


//#region city Prop
        @maxLength({value:100})
        city : string;
//#endregion city Prop


//#region postalState Prop
        @maxLength({value:100})
        postalState : string;
//#endregion postalState Prop


//#region zip Prop
        @maxLength({value:10})
        zip : string;
//#endregion zip Prop


//#region faxAreaCode Prop
        @maxLength({value:30})
        faxAreaCode : string;
//#endregion faxAreaCode Prop


//#region fax Prop
        @maxLength({value:10})
        fax : string;
//#endregion fax Prop


//#region email Prop
        @maxLength({value:100})
        email : string;
//#endregion email Prop

}