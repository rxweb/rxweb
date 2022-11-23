import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class ResourceGroupMemberBase {

//#region resourceGroupMemberId Prop
        @prop()
        resourceGroupMemberId : number;
//#endregion resourceGroupMemberId Prop


//#region resourceUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        resourceUserId : number;
//#endregion resourceUserId Prop


//#region assignedUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        assignedUserId : number;
//#endregion assignedUserId Prop


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