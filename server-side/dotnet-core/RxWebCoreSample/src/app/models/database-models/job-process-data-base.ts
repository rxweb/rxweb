import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class JobProcessDataBase {

//#region jobProcessDataId Prop
        @prop()
        jobProcessDataId : number;
//#endregion jobProcessDataId Prop


//#region jobProcessId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobProcessId : number;
//#endregion jobProcessId Prop


//#region dataName Prop
        @maxLength({value:100})
        dataName : string;
//#endregion dataName Prop


//#region dataValue Prop
        @maxLength({value:2000})
        dataValue : string;
//#endregion dataValue Prop



}