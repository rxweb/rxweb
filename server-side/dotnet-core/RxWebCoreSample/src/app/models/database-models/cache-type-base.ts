import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CacheTypeBase {

//#region cacheTypeId Prop
        @prop()
        cacheTypeId : any;
//#endregion cacheTypeId Prop


//#region cacheExpireTypeId Prop
        @required()
        cacheExpireTypeId : any;
//#endregion cacheExpireTypeId Prop


//#region expirePeriod Prop
        @required()
        expirePeriod : any;
//#endregion expirePeriod Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_CacheTypeName Prop
        @required()
        @maxLength({value:500})
        eN_CacheTypeName : string;
//#endregion eN_CacheTypeName Prop


//#region fR_CacheTypeName Prop
        @required()
        @maxLength({value:500})
        fR_CacheTypeName : string;
//#endregion fR_CacheTypeName Prop





}