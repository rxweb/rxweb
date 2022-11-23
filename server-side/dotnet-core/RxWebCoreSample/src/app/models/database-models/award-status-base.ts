import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AwardStatusBase {

//#region awardStatusId Prop
        @prop()
        awardStatusId : any;
//#endregion awardStatusId Prop


//#region statusTypeId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusTypeId : number;
//#endregion statusTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_AwardStatusName Prop
        @required()
        @maxLength({value:500})
        eN_AwardStatusName : string;
//#endregion eN_AwardStatusName Prop


//#region fR_AwardStatusName Prop
        @required()
        @maxLength({value:500})
        fR_AwardStatusName : string;
//#endregion fR_AwardStatusName Prop



}