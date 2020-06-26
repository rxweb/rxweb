import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ChainedRowBase {

//#region ownerName Prop
        @required()
        @maxLength({value:30})
        ownerName : string;
//#endregion ownerName Prop


//#region tableName Prop
        @required()
        @maxLength({value:30})
        tableName : string;
//#endregion tableName Prop


//#region clusterName Prop
        @maxLength({value:30})
        clusterName : string;
//#endregion clusterName Prop


//#region partitionName Prop
        @maxLength({value:30})
        partitionName : string;
//#endregion partitionName Prop


//#region subPartitionName Prop
        @required()
        @maxLength({value:30})
        subPartitionName : string;
//#endregion subPartitionName Prop


//#region headRowId Prop
        @required()
        @maxLength({value:4000})
        headRowId : string;
//#endregion headRowId Prop


//#region analyzeTimestamp Prop
        @required()
        analyzeTimestamp : Date;
//#endregion analyzeTimestamp Prop

}