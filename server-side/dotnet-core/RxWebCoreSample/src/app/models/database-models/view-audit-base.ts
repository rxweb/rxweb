import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ViewAuditBase {

//#region personId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        personId : number;
//#endregion personId Prop


//#region viewTypeId Prop
        @required()
        viewTypeId : any;
//#endregion viewTypeId Prop


//#region ifbId Prop
        @prop()
        ifbId : number;
//#endregion ifbId Prop


//#region amendmentNum Prop
        @prop()
        amendmentNum : number;
//#endregion amendmentNum Prop


//#region viewDate Prop
        @required()
        viewDate : Date;
//#endregion viewDate Prop


//#region detail Prop
        @maxLength({value:100})
        detail : string;
//#endregion detail Prop



}