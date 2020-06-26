import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class DestinationTypeBase {

//#region destinationTypeId Prop
        @prop()
        destinationTypeId : any;
//#endregion destinationTypeId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region isActive Prop
        @required()
        isActive : boolean;
//#endregion isActive Prop


//#region eN_DestinationTypeName Prop
        @required()
        @maxLength({value:500})
        eN_DestinationTypeName : string;
//#endregion eN_DestinationTypeName Prop


//#region fR_DestinationTypeName Prop
        @required()
        @maxLength({value:500})
        fR_DestinationTypeName : string;
//#endregion fR_DestinationTypeName Prop





}