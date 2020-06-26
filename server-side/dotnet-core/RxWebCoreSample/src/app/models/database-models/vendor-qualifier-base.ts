import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorQualifierBase {

//#region vendorQualifierId Prop
        @prop()
        vendorQualifierId : number;
//#endregion vendorQualifierId Prop


//#region companyId Prop
        @prop()
        companyId : number;
//#endregion companyId Prop


//#region methodName Prop
        @maxLength({value:100})
        methodName : string;
//#endregion methodName Prop


//#region destinationTypeId Prop
        @prop()
        destinationTypeId : any;
//#endregion destinationTypeId Prop


//#region fobTypeId Prop
        @prop()
        fobTypeId : any;
//#endregion fobTypeId Prop


//#region description Prop
        @prop()
        description : string;
//#endregion description Prop


//#region line1 Prop
        @maxLength({value:500})
        line1 : string;
//#endregion line1 Prop


//#region line2 Prop
        @maxLength({value:500})
        line2 : string;
//#endregion line2 Prop


//#region line3 Prop
        @maxLength({value:500})
        line3 : string;
//#endregion line3 Prop


//#region city Prop
        @maxLength({value:100})
        city : string;
//#endregion city Prop


//#region stateId Prop
        @prop()
        stateId : any;
//#endregion stateId Prop


//#region postalCode Prop
        @maxLength({value:20})
        postalCode : string;
//#endregion postalCode Prop


//#region detail Prop
        @prop()
        detail : string;
//#endregion detail Prop











}