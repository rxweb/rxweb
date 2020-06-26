import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class TrackRecordChangeBase {

//#region trackRecordChangeId Prop
        @prop()
        trackRecordChangeId : number;
//#endregion trackRecordChangeId Prop


//#region tableName Prop
        @maxLength({value:30})
        tableName : string;
//#endregion tableName Prop


//#region primaryKey Prop
        @maxLength({value:30})
        primaryKey : string;
//#endregion primaryKey Prop


//#region checksum Prop
        @maxLength({value:40})
        checksum : string;
//#endregion checksum Prop


//#region modified Prop
        @prop()
        modified : number;
//#endregion modified Prop


//#region deleted Prop
        @prop()
        deleted : number;
//#endregion deleted Prop


//#region added Prop
        @prop()
        added : number;
//#endregion added Prop


//#region statusTypeId Prop
        @prop()
        statusTypeId : any;
//#endregion statusTypeId Prop

}