import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SetupSequenceStatusBase {

//#region setupSequenceStatusId Prop
        @prop()
        setupSequenceStatusId : any;
//#endregion setupSequenceStatusId Prop


//#region eN_SetupSequenceStatusName Prop
        @required()
        @maxLength({value:500})
        eN_SetupSequenceStatusName : string;
//#endregion eN_SetupSequenceStatusName Prop


//#region fR_SetupSequenceStatusName Prop
        @required()
        @maxLength({value:500})
        fR_SetupSequenceStatusName : string;
//#endregion fR_SetupSequenceStatusName Prop

}