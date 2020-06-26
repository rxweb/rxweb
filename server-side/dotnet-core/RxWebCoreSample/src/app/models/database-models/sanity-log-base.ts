import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SanityLogBase {

//#region tableName Prop
        @required()
        @maxLength({value:100})
        tableName : string;
//#endregion tableName Prop


//#region lastOccurrenceDate Prop
        @prop()
        lastOccurrenceDate : Date;
//#endregion lastOccurrenceDate Prop


//#region currentDate Prop
        @required()
        currentDate : Date;
//#endregion currentDate Prop


//#region columnName Prop
        @maxLength({value:100})
        columnName : string;
//#endregion columnName Prop


//#region errorMessage Prop
        @maxLength({value:400})
        errorMessage : string;
//#endregion errorMessage Prop


//#region totalOccurrences Prop
        @prop()
        totalOccurrences : number;
//#endregion totalOccurrences Prop


//#region sanityCheckId Prop
        @prop()
        sanityCheckId : any;
//#endregion sanityCheckId Prop



}