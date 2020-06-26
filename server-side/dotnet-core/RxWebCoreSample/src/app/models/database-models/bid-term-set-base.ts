import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BidTermSetBase {

//#region bidTermSetId Prop
        @prop()
        bidTermSetId : number;
//#endregion bidTermSetId Prop


//#region bidSessionId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidSessionId : number;
//#endregion bidSessionId Prop


//#region termSetId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        termSetId : number;
//#endregion termSetId Prop


//#region displayOrder Prop
        @required()
        displayOrder : any;
//#endregion displayOrder Prop





}