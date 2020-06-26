import {MailReturnedBase} from '../database-models/mail-returned-base';
import {MailBase} from '../database-models/mail-base';
import {MailReturnedStatuBase} from '../database-models/mail-returned-statu-base';
import {MailTypeBase} from '../database-models/mail-type-base';
import {SenderBase} from '../database-models/sender-base';
//Generated Imports
export class MailReturned extends MailReturnedBase 
{




//#region Generated Reference Properties
//#region mail Prop
mail : MailBase;
//#endregion mail Prop
//#region mailReturnedStatus Prop
mailReturnedStatus : MailReturnedStatusBase;
//#endregion mailReturnedStatus Prop
//#region mailType Prop
mailType : MailTypeBase;
//#endregion mailType Prop
//#region sender Prop
sender : UserBase;
//#endregion sender Prop

//#endregion Generated Reference Properties
}