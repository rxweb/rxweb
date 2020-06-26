import {PrintOrderBase} from '../database-models/print-order-base';
import {CoverColorBase} from '../database-models/cover-color-base';
import {CoverInkBase} from '../database-models/cover-ink-base';
import {CoverSurfaceBase} from '../database-models/cover-surface-base';
import {CoverTypeBase} from '../database-models/cover-type-base';
import {SpecialCoverTypeBase} from '../database-models/special-cover-type-base';
import {SpecialTextNavigationBase} from '../database-models/special-text-navigation-base';
import {TextColorBase} from '../database-models/text-color-base';
import {TextInkBase} from '../database-models/text-ink-base';
import {TextSurfaceBase} from '../database-models/text-surface-base';
import {TextTypeBase} from '../database-models/text-type-base';
import {PrintOrderProofBase} from '../database-models/print-order-proof-base';
import {PrintOrderBinderyBase} from '../database-models/print-order-bindery-base';
import {PrintOrderMaterialBase} from '../database-models/print-order-material-base';
//Generated Imports
export class PrintOrder extends PrintOrderBase 
{




//#region Generated Reference Properties
//#region coverColor Prop
coverColor : ColorBase;
//#endregion coverColor Prop
//#region coverInk Prop
coverInk : InkBase;
//#endregion coverInk Prop
//#region coverSurface Prop
coverSurface : SurfaceBase;
//#endregion coverSurface Prop
//#region coverType Prop
coverType : GPMStockTypeBase;
//#endregion coverType Prop
//#region specialCoverType Prop
specialCoverType : GPMStockTypeBase;
//#endregion specialCoverType Prop
//#region specialTextNavigation Prop
specialTextNavigation : GPMStockTypeBase;
//#endregion specialTextNavigation Prop
//#region textColor Prop
textColor : ColorBase;
//#endregion textColor Prop
//#region textInk Prop
textInk : InkBase;
//#endregion textInk Prop
//#region textSurface Prop
textSurface : SurfaceBase;
//#endregion textSurface Prop
//#region textType Prop
textType : GPMStockTypeBase;
//#endregion textType Prop
//#region printOrderProofs Prop
printOrderProofs : PrintOrderProofBase[];
//#endregion printOrderProofs Prop
//#region printOrderBinderies Prop
printOrderBinderies : PrintOrderBinderyBase[];
//#endregion printOrderBinderies Prop
//#region printOrderMaterials Prop
printOrderMaterials : PrintOrderMaterialBase[];
//#endregion printOrderMaterials Prop

//#endregion Generated Reference Properties
}