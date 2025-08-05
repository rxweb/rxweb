import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ApplicationUserTokenBase {

//#region applicationUserTokenId Prop
        @prop()
        applicationUserTokenId : number;
//#endregion applicationUserTokenId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region securityKey Prop
        @required()
        @maxLength({value:200})
        securityKey : string;
//#endregion securityKey Prop


//#region jwtToken Prop
        @required()
        jwtToken : string;
//#endregion jwtToken Prop


//#region audienceType Prop
        @required()
        @maxLength({value:50})
        audienceType : string;
//#endregion audienceType Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop



}