import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BrandBase {

//#region brandId Prop
        @prop()
        brandId : any;
//#endregion brandId Prop


//#region baseBrandId Prop
        @prop()
        baseBrandId : any;
//#endregion baseBrandId Prop


//#region eN_BrandDescription Prop
        @required()
        @maxLength({value:500})
        eN_BrandDescription : string;
//#endregion eN_BrandDescription Prop


//#region eN_PortalName Prop
        @required()
        @maxLength({value:500})
        eN_PortalName : string;
//#endregion eN_PortalName Prop


//#region eN_SystemName Prop
        @required()
        @maxLength({value:500})
        eN_SystemName : string;
//#endregion eN_SystemName Prop


//#region eN_SystemURL Prop
        @required()
        @maxLength({value:500})
        eN_SystemURL : string;
//#endregion eN_SystemURL Prop


//#region fR_BrandDescription Prop
        @maxLength({value:500})
        fR_BrandDescription : string;
//#endregion fR_BrandDescription Prop


//#region fR_PortalName Prop
        @maxLength({value:500})
        fR_PortalName : string;
//#endregion fR_PortalName Prop


//#region fR_SystemName Prop
        @maxLength({value:500})
        fR_SystemName : string;
//#endregion fR_SystemName Prop


//#region fR_SystemURL Prop
        @maxLength({value:500})
        fR_SystemURL : string;
//#endregion fR_SystemURL Prop











}