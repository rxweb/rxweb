import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class CustomTextMemberBase {

//#region customTextMemberId Prop
        @prop()
        customTextMemberId : number;
//#endregion customTextMemberId Prop


//#region customTextItemId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        customTextItemId : number;
//#endregion customTextItemId Prop


//#region userId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        userId : number;
//#endregion userId Prop


//#region customTextId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        customTextId : number;
//#endregion customTextId Prop







}