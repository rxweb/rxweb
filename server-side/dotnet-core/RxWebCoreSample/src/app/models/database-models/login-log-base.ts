import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class LoginLogBase {

//#region loginLogId Prop
        @prop()
        loginLogId : number;
//#endregion loginLogId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region loginDate Prop
        @required()
        loginDate : Date;
//#endregion loginDate Prop


//#region loginLogStatusId Prop
        @required()
        loginLogStatusId : any;
//#endregion loginLogStatusId Prop


//#region iPAddress Prop
        @maxLength({value:100})
        iPAddress : string;
//#endregion iPAddress Prop



}