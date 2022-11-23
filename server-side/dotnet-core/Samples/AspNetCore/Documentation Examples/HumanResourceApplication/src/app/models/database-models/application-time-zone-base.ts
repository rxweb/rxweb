import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ApplicationTimeZoneBase {

//#region applicationTimeZoneId Prop
        @prop()
        applicationTimeZoneId : number;
//#endregion applicationTimeZoneId Prop


//#region applicationTimeZoneName Prop
        @required()
        @maxLength({value:100})
        applicationTimeZoneName : string;
//#endregion applicationTimeZoneName Prop


//#region comment Prop
        @required()
        @maxLength({value:200})
        comment : string;
//#endregion comment Prop


//#region statusId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        statusId : number;
//#endregion statusId Prop

}