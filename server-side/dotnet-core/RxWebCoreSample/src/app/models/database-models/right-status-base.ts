import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RightStatusBase {

//#region rightStatusId Prop
        @prop()
        rightStatusId : any;
//#endregion rightStatusId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_RightStatusName Prop
        @required()
        @maxLength({value:500})
        eN_RightStatusName : string;
//#endregion eN_RightStatusName Prop


//#region fR_RightStatusName Prop
        @required()
        @maxLength({value:500})
        fR_RightStatusName : string;
//#endregion fR_RightStatusName Prop

}