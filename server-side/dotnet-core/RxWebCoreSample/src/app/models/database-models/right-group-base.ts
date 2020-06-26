import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RightGroupBase {

//#region rightGroupId Prop
        @prop()
        rightGroupId : any;
//#endregion rightGroupId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_RightGroupName Prop
        @required()
        @maxLength({value:500})
        eN_RightGroupName : string;
//#endregion eN_RightGroupName Prop


//#region fR_RightGroupName Prop
        @maxLength({value:500})
        fR_RightGroupName : string;
//#endregion fR_RightGroupName Prop



}