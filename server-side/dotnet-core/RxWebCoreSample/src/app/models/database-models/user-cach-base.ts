import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class UserCachBase {

//#region userCacheId Prop
        @prop()
        userCacheId : number;
//#endregion userCacheId Prop


//#region cacheTypeId Prop
        @required()
        cacheTypeId : any;
//#endregion cacheTypeId Prop


//#region expireDate Prop
        @prop()
        expireDate : Date;
//#endregion expireDate Prop


//#region cache Prop
        @prop()
        cache : string;
//#endregion cache Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @required()
        updatedDateTime : any;
//#endregion updatedDateTime Prop



}