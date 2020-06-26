import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobGroupBase {

//#region jobGroupId Prop
        @prop()
        jobGroupId : number;
//#endregion jobGroupId Prop


//#region jobGroupName Prop
        @required()
        @maxLength({value:100})
        jobGroupName : string;
//#endregion jobGroupName Prop


//#region description Prop
        @prop()
        description : string;
//#endregion description Prop


//#region parentJobGroupId Prop
        @prop()
        parentJobGroupId : number;
//#endregion parentJobGroupId Prop









}