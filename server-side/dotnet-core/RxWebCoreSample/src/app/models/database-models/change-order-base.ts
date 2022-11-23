import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ChangeOrderBase {

//#region changeOrderId Prop
        @prop()
        changeOrderId : number;
//#endregion changeOrderId Prop


//#region jobId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobId : number;
//#endregion jobId Prop


//#region jobThreadId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        jobThreadId : number;
//#endregion jobThreadId Prop


//#region createUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createUserId : number;
//#endregion createUserId Prop


//#region changeOrderStatusId Prop
        @required()
        changeOrderStatusId : any;
//#endregion changeOrderStatusId Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region specId Prop
        @prop()
        specId : number;
//#endregion specId Prop


//#region specXml Prop
        @prop()
        specXml : string;
//#endregion specXml Prop













}