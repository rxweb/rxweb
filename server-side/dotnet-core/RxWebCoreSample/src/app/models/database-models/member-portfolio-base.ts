import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class MemberPortfolioBase {

//#region memberPortfolioId Prop
        @prop()
        memberPortfolioId : number;
//#endregion memberPortfolioId Prop


//#region memberId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        memberId : number;
//#endregion memberId Prop


//#region portfolioTypeId Prop
        @required()
        portfolioTypeId : any;
//#endregion portfolioTypeId Prop


//#region name Prop
        @maxLength({value:4000})
        name : string;
//#endregion name Prop


//#region contact Prop
        @maxLength({value:4000})
        contact : string;
//#endregion contact Prop


//#region address Prop
        @maxLength({value:4000})
        address : string;
//#endregion address Prop


//#region phone Prop
        @maxLength({value:4000})
        phone : string;
//#endregion phone Prop


//#region fax Prop
        @maxLength({value:4000})
        fax : string;
//#endregion fax Prop


//#region email Prop
        @maxLength({value:4000})
        email : string;
//#endregion email Prop


//#region other Prop
        @maxLength({value:4000})
        other : string;
//#endregion other Prop


//#region memberPortfolioStatusId Prop
        @required()
        memberPortfolioStatusId : any;
//#endregion memberPortfolioStatusId Prop


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


//#region city Prop
        @maxLength({value:50})
        city : string;
//#endregion city Prop


//#region stateId Prop
        @prop()
        stateId : any;
//#endregion stateId Prop


//#region postalCode Prop
        @maxLength({value:20})
        postalCode : string;
//#endregion postalCode Prop


//#region compressedPhone Prop
        @maxLength({value:20})
        compressedPhone : string;
//#endregion compressedPhone Prop


//#region phoneExt Prop
        @maxLength({value:20})
        phoneExt : string;
//#endregion phoneExt Prop


//#region compressedFax Prop
        @maxLength({value:20})
        compressedFax : string;
//#endregion compressedFax Prop


//#region faxExt Prop
        @maxLength({value:20})
        faxExt : string;
//#endregion faxExt Prop


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