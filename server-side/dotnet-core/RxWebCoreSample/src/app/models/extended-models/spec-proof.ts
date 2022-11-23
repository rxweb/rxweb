import {SpecProofBase} from '../database-models/spec-proof-base';
import {ProofBase} from '../database-models/proof-base';
import {SpecBase} from '../database-models/spec-base';
import {SpecItemCurrentStatuBase} from '../database-models/spec-item-current-statu-base';
import {SpecItemInitialStatuBase} from '../database-models/spec-item-initial-statu-base';
import {WorkingProofBase} from '../database-models/working-proof-base';
//Generated Imports
export class SpecProof extends SpecProofBase 
{




//#region Generated Reference Properties
//#region proof Prop
proof : ProofBase;
//#endregion proof Prop
//#region spec Prop
spec : SpecificationDetailBase;
//#endregion spec Prop
//#region specItemCurrentStatus Prop
specItemCurrentStatus : SpecItemCurrentStatusBase;
//#endregion specItemCurrentStatus Prop
//#region specItemInitialStatus Prop
specItemInitialStatus : SpecItemInitialStatusBase;
//#endregion specItemInitialStatus Prop
//#region workingProof Prop
workingProof : ProofBase;
//#endregion workingProof Prop

//#endregion Generated Reference Properties
}