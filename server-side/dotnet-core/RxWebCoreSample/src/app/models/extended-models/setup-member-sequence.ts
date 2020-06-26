import {SetupMemberSequenceBase} from '../database-models/setup-member-sequence-base';
import {MemberBase} from '../database-models/member-base';
import {SecondaryBase} from '../database-models/secondary-base';
import {SetupBase} from '../database-models/setup-base';
import {SetupMemSeqStatuBase} from '../database-models/setup-mem-seq-statu-base';
//Generated Imports
export class SetupMemberSequence extends SetupMemberSequenceBase 
{




//#region Generated Reference Properties
//#region member Prop
member : UserBase;
//#endregion member Prop
//#region secondary Prop
secondary : UserBase;
//#endregion secondary Prop
//#region setup Prop
setup : SetupSequenceBase;
//#endregion setup Prop
//#region setupMemSeqStatus Prop
setupMemSeqStatus : SetupMemberSequenceStatusBase;
//#endregion setupMemSeqStatus Prop

//#endregion Generated Reference Properties
}