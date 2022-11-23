import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class SetupRequestBase {

//#region jobId Prop
        @prop()
        jobId : number;
//#endregion jobId Prop


//#region providerJobId Prop
        @prop()
        providerJobId : number;
//#endregion providerJobId Prop


//#region providerDeptId Prop
        @prop()
        providerDeptId : number;
//#endregion providerDeptId Prop


//#region requestedByUserId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        requestedByUserId : number;
//#endregion requestedByUserId Prop


//#region requestedByDeptId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        requestedByDeptId : number;
//#endregion requestedByDeptId Prop


//#region requestedUserId Prop
        @prop()
        requestedUserId : number;
//#endregion requestedUserId Prop


//#region requestedDeptId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        requestedDeptId : number;
//#endregion requestedDeptId Prop


//#region serviceId Prop
        @required()
        serviceId : any;
//#endregion serviceId Prop


//#region setupRequestStatusId Prop
        @prop()
        setupRequestStatusId : any;
//#endregion setupRequestStatusId Prop


//#region name Prop
        @maxLength({value:4000})
        name : string;
//#endregion name Prop


//#region description Prop
        @maxLength({value:4000})
        description : string;
//#endregion description Prop


//#region agentId Prop
        @prop()
        agentId : number;
//#endregion agentId Prop


//#region productAgentId Prop
        @prop()
        productAgentId : number;
//#endregion productAgentId Prop


//#region contactName Prop
        @maxLength({value:4000})
        contactName : string;
//#endregion contactName Prop


//#region email Prop
        @maxLength({value:4000})
        email : string;
//#endregion email Prop


//#region phone Prop
        @maxLength({value:20})
        phone : string;
//#endregion phone Prop


//#region phoneExt Prop
        @maxLength({value:50})
        phoneExt : string;
//#endregion phoneExt Prop


//#region fax Prop
        @maxLength({value:20})
        fax : string;
//#endregion fax Prop


//#region faxExt Prop
        @maxLength({value:50})
        faxExt : string;
//#endregion faxExt Prop


//#region timezoneId Prop
        @prop()
        timezoneId : any;
//#endregion timezoneId Prop


//#region useDaylightSavingsTime Prop
        @prop()
        useDaylightSavingsTime : any;
//#endregion useDaylightSavingsTime Prop


//#region cloneCompId Prop
        @prop()
        cloneCompId : number;
//#endregion cloneCompId Prop


//#region brandId Prop
        @prop()
        brandId : any;
//#endregion brandId Prop


//#region customText Prop
        @maxLength({value:4000})
        customText : string;
//#endregion customText Prop


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