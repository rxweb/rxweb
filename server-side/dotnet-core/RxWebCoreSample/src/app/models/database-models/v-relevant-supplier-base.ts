import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class vRelevantSupplierBase {

//#region vendorId Prop
        @gridColumn({visible: true, columnIndex:0, allowSorting: true, headerKey: 'vendorId', keyColumn: true})
        vendorId : number;
//#endregion vendorId Prop


//#region vendorStatusId Prop
        @gridColumn({visible: true, columnIndex:1, allowSorting: true, headerKey: 'vendorStatusId', keyColumn: false})
        vendorStatusId : any;
//#endregion vendorStatusId Prop


//#region statusSetDate Prop
        @gridColumn({visible: true, columnIndex:2, allowSorting: true, headerKey: 'statusSetDate', keyColumn: false})
        statusSetDate : any;
//#endregion statusSetDate Prop


//#region acquiredByUserId Prop
        @gridColumn({visible: true, columnIndex:3, allowSorting: true, headerKey: 'acquiredByUserId', keyColumn: false})
        acquiredByUserId : any;
//#endregion acquiredByUserId Prop


//#region followupRequestDate Prop
        @gridColumn({visible: true, columnIndex:4, allowSorting: true, headerKey: 'followupRequestDate', keyColumn: false})
        followupRequestDate : any;
//#endregion followupRequestDate Prop


//#region elynxxSourcingStatusId Prop
        @gridColumn({visible: true, columnIndex:5, allowSorting: true, headerKey: 'elynxxSourcingStatusId', keyColumn: false})
        elynxxSourcingStatusId : any;
//#endregion elynxxSourcingStatusId Prop


//#region lastContact Prop
        @gridColumn({visible: true, columnIndex:6, allowSorting: true, headerKey: 'lastContact', keyColumn: false})
        lastContact : any;
//#endregion lastContact Prop

}