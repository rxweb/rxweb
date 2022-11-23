import {ProofBase} from '../database-models/proof-base';
import {ProofApprovalScheduleBase} from '../database-models/proof-approval-schedule-base';
import {ProofTypeBase} from '../database-models/proof-type-base';
import {TimeOffsetUnitBase} from '../database-models/time-offset-unit-base';
import {SpecProofBase} from '../database-models/spec-proof-base';
import {SpecProofsWorkingProofBase} from '../database-models/spec-proofs-working-proof-base';
import {ProofFileAttachmentBase} from '../database-models/proof-file-attachment-base';
//Generated Imports
export class Proof extends ProofBase 
{




//#region Generated Reference Properties
//#region proofApprovalSchedule Prop
proofApprovalSchedule : ProofApprovalScheduleBase;
//#endregion proofApprovalSchedule Prop
//#region proofType Prop
proofType : ProofTypeBase;
//#endregion proofType Prop
//#region timeOffsetUnit Prop
timeOffsetUnit : TimeOffSetUnitBase;
//#endregion timeOffsetUnit Prop
//#region specProofs Prop
specProofs : SpecProofBase[];
//#endregion specProofs Prop
//#region specProofsWorkingProof Prop
specProofsWorkingProof : SpecProofBase[];
//#endregion specProofsWorkingProof Prop
//#region proofFileAttachments Prop
proofFileAttachments : ProofFileAttachmentBase[];
//#endregion proofFileAttachments Prop

//#endregion Generated Reference Properties
}