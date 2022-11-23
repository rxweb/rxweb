import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ErroneousBidBase {

//#region erroneousBidId Prop
        @prop()
        erroneousBidId : number;
//#endregion erroneousBidId Prop


//#region bidSessionBidderId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        bidSessionBidderId : number;
//#endregion bidSessionBidderId Prop


//#region erroneousBidStatusId Prop
        @required()
        erroneousBidStatusId : any;
//#endregion erroneousBidStatusId Prop


//#region comments Prop
        @maxLength({value:4000})
        comments : string;
//#endregion comments Prop


//#region createdBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        createdBy : number;
//#endregion createdBy Prop


//#region createdDateTime Prop
        @required()
        createdDateTime : any;
//#endregion createdDateTime Prop


//#region updatedBy Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        updatedBy : number;
//#endregion updatedBy Prop


//#region updatedDateTime Prop
        @required()
        updatedDateTime : any;
//#endregion updatedDateTime Prop





}