import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PrepressAvailabilityBase {

//#region prepressAvailabilityId Prop
        @prop()
        prepressAvailabilityId : any;
//#endregion prepressAvailabilityId Prop


//#region status Prop
        @required()
        status : any;
//#endregion status Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop


//#region eN_PrepressAvailabilityName Prop
        @required()
        @maxLength({value:500})
        eN_PrepressAvailabilityName : string;
//#endregion eN_PrepressAvailabilityName Prop


//#region fR_PrepressAvailabilityName Prop
        @required()
        @maxLength({value:500})
        fR_PrepressAvailabilityName : string;
//#endregion fR_PrepressAvailabilityName Prop

}