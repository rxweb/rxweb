import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class GlobalConfigurationBase {

//#region id Prop
        @prop()
        id : number;
//#endregion id Prop


//#region accountName Prop
        @maxLength({value:150})
        accountName : string;
//#endregion accountName Prop


//#region emailAddress Prop
        @maxLength({value:350})
        emailAddress : string;
//#endregion emailAddress Prop


//#region emailServer Prop
        @maxLength({value:500})
        emailServer : string;
//#endregion emailServer Prop


//#region portNumber Prop
        @prop()
        portNumber : number;
//#endregion portNumber Prop


//#region userName Prop
        @maxLength({value:200})
        userName : string;
//#endregion userName Prop


//#region password Prop
        @maxLength({value:200})
        password : string;
//#endregion password Prop

}