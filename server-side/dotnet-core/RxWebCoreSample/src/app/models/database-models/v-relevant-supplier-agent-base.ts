import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vRelevantSupplierAgentBase {

//#region vendorId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'vendorId', keyColumn: true})
        vendorId : number;
//#endregion vendorId Prop


//#region agentId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'agentId', keyColumn: false})
        agentId : any;
//#endregion agentId Prop

}