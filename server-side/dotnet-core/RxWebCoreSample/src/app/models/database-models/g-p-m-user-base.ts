import { prop,propObject,propArray,required,maxLength,range  } from "@rxweb/reactive-form-validators"
import { gridColumn } from "@rxweb/grid"


export class GPMUserBase {

//#region userId Prop
        @prop()
        userId : number;
//#endregion userId Prop


//#region companyId Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        companyId : number;
//#endregion companyId Prop


//#region userName Prop
        @maxLength({value:50})
        userName : string;
//#endregion userName Prop


//#region password Prop
        @maxLength({value:50})
        password : string;
//#endregion password Prop


//#region salt Prop
        @maxLength({value:100})
        salt : any;
//#endregion salt Prop


//#region email Prop
        @maxLength({value:100})
        email : string;
//#endregion email Prop


//#region name Prop
        @maxLength({value:100})
        name : string;
//#endregion name Prop


//#region sessionKey Prop
        @maxLength({value:100})
        sessionKey : string;
//#endregion sessionKey Prop


//#region flagMain Prop
        @required()
        flagMain : boolean;
//#endregion flagMain Prop


//#region flagSolic Prop
        @required()
        flagSolic : boolean;
//#endregion flagSolic Prop


//#region flagSearch Prop
        @required()
        flagSearch : boolean;
//#endregion flagSearch Prop


//#region flagPrivate Prop
        @required()
        flagPrivate : boolean;
//#endregion flagPrivate Prop


//#region flagReport Prop
        @required()
        flagReport : boolean;
//#endregion flagReport Prop


//#region flagAccount Prop
        @required()
        flagAccount : boolean;
//#endregion flagAccount Prop


//#region flagAdmin Prop
        @required()
        flagAdmin : boolean;
//#endregion flagAdmin Prop


//#region gMTOffSet Prop
        @required()
        gMTOffSet : any;
//#endregion gMTOffSet Prop


//#region useDaylightSavingsTime Prop
        @range({minimumNumber:1,maximumNumber:2147483647})
        @required()
        useDaylightSavingsTime : number;
//#endregion useDaylightSavingsTime Prop


//#region flagSmallDisadvantagedBusiness Prop
        @required()
        flagSmallDisadvantagedBusiness : any;
//#endregion flagSmallDisadvantagedBusiness Prop


//#region flagDisplay Prop
        @required()
        flagDisplay : any;
//#endregion flagDisplay Prop


//#region flagSort1 Prop
        @required()
        flagSort1 : any;
//#endregion flagSort1 Prop


//#region flagSort2 Prop
        @required()
        flagSort2 : any;
//#endregion flagSort2 Prop


//#region flagAmend Prop
        @required()
        flagAmend : any;
//#endregion flagAmend Prop


//#region flagGovernmentPublishingOffice Prop
        @prop()
        flagGovernmentPublishingOffice : any;
//#endregion flagGovernmentPublishingOffice Prop


//#region userStatusId Prop
        @required()
        userStatusId : any;
//#endregion userStatusId Prop







}