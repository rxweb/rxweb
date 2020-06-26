import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class RoleAbilityBase {

//#region roleCompanyMappingId Prop
        @prop()
        roleCompanyMappingId : number;
//#endregion roleCompanyMappingId Prop


//#region abilityId Prop
        @prop()
        abilityId : number;
//#endregion abilityId Prop


//#region isOptional Prop
        @prop()
        isOptional : boolean;
//#endregion isOptional Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop


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