import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VersionBase {

//#region versionNumber Prop
        @maxLength({value:100})
        versionNumber : string;
//#endregion versionNumber Prop


//#region appliedDate Prop
        @required()
        appliedDate : Date;
//#endregion appliedDate Prop


//#region appliedUser Prop
        @required()
        @maxLength({value:50})
        appliedUser : string;
//#endregion appliedUser Prop


//#region databaseLabel Prop
        @required()
        @maxLength({value:100})
        databaseLabel : string;
//#endregion databaseLabel Prop


//#region databaseType Prop
        @maxLength({value:100})
        databaseType : string;
//#endregion databaseType Prop


//#region frontendLabel Prop
        @maxLength({value:100})
        frontendLabel : string;
//#endregion frontendLabel Prop

}