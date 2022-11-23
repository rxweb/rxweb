import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class PhysicalFileBase {

//#region physicalFileId Prop
        @prop()
        physicalFileId : number;
//#endregion physicalFileId Prop


//#region fileName Prop
        @required()
        @maxLength({value:1000})
        fileName : string;
//#endregion fileName Prop


//#region sizeInBytes Prop
        @prop()
        sizeInBytes : any;
//#endregion sizeInBytes Prop


//#region storagePath Prop
        @required()
        @maxLength({value:1000})
        storagePath : string;
//#endregion storagePath Prop


//#region uploadUserName Prop
        @required()
        @maxLength({value:1000})
        uploadUserName : string;
//#endregion uploadUserName Prop


//#region uploadDate Prop
        @prop()
        uploadDate : Date;
//#endregion uploadDate Prop


//#region scanStatus Prop
        @prop()
        scanStatus : number;
//#endregion scanStatus Prop


//#region scanResult Prop
        @maxLength({value:4000})
        scanResult : string;
//#endregion scanResult Prop

}