import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class AbilityScopeStepTeamBase {

//#region abilityId Prop
        @prop()
        abilityId : number;
//#endregion abilityId Prop


//#region scopeId Prop
        @prop()
        scopeId : any;
//#endregion scopeId Prop


//#region stepId Prop
        @prop()
        stepId : number;
//#endregion stepId Prop


//#region teamRightId Prop
        @prop()
        teamRightId : number;
//#endregion teamRightId Prop


//#region rightId Prop
        @prop()
        rightId : number;
//#endregion rightId Prop


//#region statusTypeId Prop
        @required()
        statusTypeId : any;
//#endregion statusTypeId Prop











}