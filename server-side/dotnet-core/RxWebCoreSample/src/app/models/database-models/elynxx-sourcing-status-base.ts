import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ElynxxSourcingStatusBase {

//#region elynxxSourcingStatusId Prop
        @prop()
        elynxxSourcingStatusId : any;
//#endregion elynxxSourcingStatusId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region eN_ElynxxSourcingStatus Prop
        @required()
        @maxLength({value:500})
        eN_ElynxxSourcingStatus : string;
//#endregion eN_ElynxxSourcingStatus Prop


//#region fR_ElynxxSourcingStatus Prop
        @maxLength({value:500})
        fR_ElynxxSourcingStatus : string;
//#endregion fR_ElynxxSourcingStatus Prop



}