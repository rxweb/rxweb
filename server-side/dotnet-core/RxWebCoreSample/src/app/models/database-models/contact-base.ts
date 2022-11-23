import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ContactBase {

//#region companyId Prop
        @prop()
        companyId : number;
//#endregion companyId Prop


//#region contactId Prop
        @prop()
        contactId : number;
//#endregion contactId Prop


//#region prefix Prop
        @maxLength({value:10})
        prefix : string;
//#endregion prefix Prop


//#region firstName Prop
        @maxLength({value:40})
        firstName : string;
//#endregion firstName Prop


//#region middleName Prop
        @maxLength({value:40})
        middleName : string;
//#endregion middleName Prop


//#region lastName Prop
        @maxLength({value:40})
        lastName : string;
//#endregion lastName Prop


//#region postTitle Prop
        @maxLength({value:10})
        postTitle : string;
//#endregion postTitle Prop


//#region title Prop
        @maxLength({value:40})
        title : string;
//#endregion title Prop


//#region addressId Prop
        @prop()
        addressId : number;
//#endregion addressId Prop


//#region phoneAreaCode Prop
        @maxLength({value:3})
        phoneAreaCode : string;
//#endregion phoneAreaCode Prop


//#region phone Prop
        @maxLength({value:7})
        phone : string;
//#endregion phone Prop


//#region phone2AreaCode Prop
        @maxLength({value:3})
        phone2AreaCode : string;
//#endregion phone2AreaCode Prop


//#region phone2 Prop
        @maxLength({value:7})
        phone2 : string;
//#endregion phone2 Prop


//#region faxAreaCode Prop
        @maxLength({value:3})
        faxAreaCode : string;
//#endregion faxAreaCode Prop


//#region fax Prop
        @maxLength({value:7})
        fax : string;
//#endregion fax Prop


//#region username Prop
        @maxLength({value:40})
        username : string;
//#endregion username Prop


//#region password Prop
        @maxLength({value:40})
        password : string;
//#endregion password Prop


//#region contactType Prop
        @maxLength({value:1})
        contactType : string;
//#endregion contactType Prop

}