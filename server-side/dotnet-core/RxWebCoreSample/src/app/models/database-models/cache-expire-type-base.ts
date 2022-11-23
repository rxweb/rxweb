import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CacheExpireTypeBase {

//#region cacheExpireTypeId Prop
        @prop()
        cacheExpireTypeId : any;
//#endregion cacheExpireTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_CacheExpireTypeName Prop
        @required()
        @maxLength({value:500})
        eN_CacheExpireTypeName : string;
//#endregion eN_CacheExpireTypeName Prop


//#region fR_CacheExpireTypeName Prop
        @required()
        @maxLength({value:500})
        fR_CacheExpireTypeName : string;
//#endregion fR_CacheExpireTypeName Prop



}