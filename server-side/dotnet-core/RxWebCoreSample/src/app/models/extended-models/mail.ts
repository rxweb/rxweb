import {MailBase} from '../database-models/mail-base';
import {MailTypeBase} from '../database-models/mail-type-base';
import {SenderBase} from '../database-models/sender-base';
import {SentStatuBase} from '../database-models/sent-statu-base';
import {MailRecipientBase} from '../database-models/mail-recipient-base';
//Generated Imports
export class Mail extends MailBase 
{




//#region Generated Reference Properties
//#region mailType Prop
mailType : MailTypeBase;
//#endregion mailType Prop
//#region sender Prop
sender : UserBase;
//#endregion sender Prop
//#region sentStatus Prop
sentStatus : SentStatusBase;
//#endregion sentStatus Prop
//#region mailRecipients Prop
mailRecipients : MailRecipientBase[];
//#endregion mailRecipients Prop

//#endregion Generated Reference Properties
}