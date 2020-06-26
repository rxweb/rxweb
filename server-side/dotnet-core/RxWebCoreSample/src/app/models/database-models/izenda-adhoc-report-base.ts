import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class IzendaAdhocReportBase {

//#region name Prop
        @required()
        @maxLength({value:255})
        name : string;
//#endregion name Prop


//#region xml Prop
        @required()
        xml : string;
//#endregion xml Prop


//#region createdDate Prop
        @required()
        createdDate : Date;
//#endregion createdDate Prop


//#region modifiedDate Prop
        @required()
        modifiedDate : Date;
//#endregion modifiedDate Prop


//#region tenantId Prop
        @required()
        @maxLength({value:255})
        tenantId : string;
//#endregion tenantId Prop

}