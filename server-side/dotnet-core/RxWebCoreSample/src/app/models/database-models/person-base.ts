import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PersonBase {

//#region personId Prop
        @prop()
        personId : number;
//#endregion personId Prop


//#region personName Prop
        @required()
        @maxLength({value:50})
        personName : string;
//#endregion personName Prop


//#region isActive Prop
        @prop()
        isActive : boolean;
//#endregion isActive Prop

}