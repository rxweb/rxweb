import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class VendorTeamMemberBase {

//#region vendorTeamMemberId Prop
        @prop()
        vendorTeamMemberId : number;
//#endregion vendorTeamMemberId Prop


//#region roleCompanyMappingId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        roleCompanyMappingId : number;
//#endregion roleCompanyMappingId Prop


//#region stepRightId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        stepRightId : number;
//#endregion stepRightId Prop


//#region assignedUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        assignedUserId : number;
//#endregion assignedUserId Prop


//#region isDefault Prop
        @prop()
        isDefault : boolean;
//#endregion isDefault Prop


//#region buyerVendorId Prop
        @prop()
        buyerVendorId : number;
//#endregion buyerVendorId Prop


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