import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RollOrientationBase {

//#region rollOrientationId Prop
        @prop()
        rollOrientationId : any;
//#endregion rollOrientationId Prop


//#region status Prop
        @required()
        status : any;
//#endregion status Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_RollOrientationName Prop
        @required()
        @maxLength({value:500})
        eN_RollOrientationName : string;
//#endregion eN_RollOrientationName Prop


//#region fR_RollOrientationName Prop
        @required()
        @maxLength({value:500})
        fR_RollOrientationName : string;
//#endregion fR_RollOrientationName Prop



}