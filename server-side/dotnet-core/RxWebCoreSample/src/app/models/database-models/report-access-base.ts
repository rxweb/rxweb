import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ReportAccessBase {

//#region reportAccessId Prop
        @prop()
        reportAccessId : any;
//#endregion reportAccessId Prop


//#region eN_ReportAccessName Prop
        @required()
        @maxLength({value:500})
        eN_ReportAccessName : string;
//#endregion eN_ReportAccessName Prop


//#region fR_ReportAccessName Prop
        @maxLength({value:500})
        fR_ReportAccessName : string;
//#endregion fR_ReportAccessName Prop



}