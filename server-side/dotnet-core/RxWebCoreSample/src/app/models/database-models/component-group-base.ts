import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ComponentGroupBase {

//#region componentGroupId Prop
        @prop()
        componentGroupId : any;
//#endregion componentGroupId Prop


//#region displayOrder Prop
        @prop()
        displayOrder : number;
//#endregion displayOrder Prop


//#region eN_ComponentGroupName Prop
        @required()
        @maxLength({value:500})
        eN_ComponentGroupName : string;
//#endregion eN_ComponentGroupName Prop


//#region fR_ComponentGroupName Prop
        @required()
        @maxLength({value:500})
        fR_ComponentGroupName : string;
//#endregion fR_ComponentGroupName Prop



}