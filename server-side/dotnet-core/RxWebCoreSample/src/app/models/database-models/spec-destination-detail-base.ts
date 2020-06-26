import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SpecDestinationDetailBase {

//#region specDestinationId Prop
        @prop()
        specDestinationId : number;
//#endregion specDestinationId Prop


//#region specId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        specId : number;
//#endregion specId Prop


//#region destinationTypeId Prop
        @required()
        destinationTypeId : any;
//#endregion destinationTypeId Prop


//#region fobTypeId Prop
        @required()
        fobTypeId : any;
//#endregion fobTypeId Prop


//#region method Prop
        @maxLength({value:4000})
        method : string;
//#endregion method Prop


//#region detail Prop
        @maxLength({value:4000})
        detail : string;
//#endregion detail Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region line1 Prop
        @maxLength({value:4000})
        line1 : string;
//#endregion line1 Prop


//#region line2 Prop
        @maxLength({value:4000})
        line2 : string;
//#endregion line2 Prop


//#region line3 Prop
        @maxLength({value:4000})
        line3 : string;
//#endregion line3 Prop


//#region stateId Prop
        @prop()
        stateId : any;
//#endregion stateId Prop


//#region postalCode Prop
        @maxLength({value:20})
        postalCode : string;
//#endregion postalCode Prop


//#region city Prop
        @maxLength({value:4000})
        city : string;
//#endregion city Prop


//#region defaultReceiveUserId Prop
        @prop()
        defaultReceiveUserId : number;
//#endregion defaultReceiveUserId Prop


//#region defaultApproveUserId Prop
        @prop()
        defaultApproveUserId : number;
//#endregion defaultApproveUserId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


//#region accountId Prop
        @maxLength({value:100})
        accountId : string;
//#endregion accountId Prop


//#region addressSeqNum Prop
        @prop()
        addressSeqNum : number;
//#endregion addressSeqNum Prop


//#region company Prop
        @maxLength({value:100})
        company : string;
//#endregion company Prop


//#region attn Prop
        @maxLength({value:100})
        attn : string;
//#endregion attn Prop


//#region phone Prop
        @maxLength({value:20})
        phone : string;
//#endregion phone Prop


//#region email Prop
        @maxLength({value:200})
        email : string;
//#endregion email Prop


//#region contact Prop
        @maxLength({value:200})
        contact : string;
//#endregion contact Prop


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