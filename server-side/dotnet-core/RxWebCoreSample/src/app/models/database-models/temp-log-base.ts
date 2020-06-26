import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TempLogBase {

//#region logDate Prop
        @required()
        logDate : Date;
//#endregion logDate Prop


//#region message Prop
        @required()
        @maxLength({value:200})
        message : string;
//#endregion message Prop


//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region email Prop
        @maxLength({value:200})
        email : string;
//#endregion email Prop

}