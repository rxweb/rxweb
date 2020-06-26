import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class IndexAnalyzerBase {

//#region indexName Prop
        @required()
        @maxLength({value:4000})
        indexName : string;
//#endregion indexName Prop


//#region buildVersionNumber Prop
        @required()
        @maxLength({value:100})
        buildVersionNumber : string;
//#endregion buildVersionNumber Prop


//#region tableName Prop
        @required()
        @maxLength({value:4000})
        tableName : string;
//#endregion tableName Prop


//#region analyzeCommand Prop
        @required()
        @maxLength({value:4000})
        analyzeCommand : string;
//#endregion analyzeCommand Prop


//#region coalesceCommand Prop
        @maxLength({value:4000})
        coalesceCommand : string;
//#endregion coalesceCommand Prop


//#region initialWastedSpace Prop
        @required()
        initialWastedSpace : number;
//#endregion initialWastedSpace Prop


//#region finalWastedSpace Prop
        @prop()
        finalWastedSpace : number;
//#endregion finalWastedSpace Prop

}