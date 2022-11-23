import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class BuyerComponentBase {

//#region buyerComponentId Prop
        @prop()
        buyerComponentId : number;
//#endregion buyerComponentId Prop


//#region buyerId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        buyerId : number;
//#endregion buyerId Prop


//#region componentId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        componentId : number;
//#endregion componentId Prop


//#region buyerComponentStatusId Prop
        @required()
        buyerComponentStatusId : any;
//#endregion buyerComponentStatusId Prop


//#region numberOfJobs Prop
        @prop()
        numberOfJobs : number;
//#endregion numberOfJobs Prop


//#region dollarVolume Prop
        @prop()
        dollarVolume : number;
//#endregion dollarVolume Prop


//#region defaultQualityId Prop
        @prop()
        defaultQualityId : any;
//#endregion defaultQualityId Prop


//#region defaultSpecEquivalents Prop
        @prop()
        defaultSpecEquivalents : any;
//#endregion defaultSpecEquivalents Prop


//#region createdBy Prop
        @prop()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @prop()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @prop()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @prop()
        updatedDateTime : any;
//#endregion updatedDateTime Prop









}