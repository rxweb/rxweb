import {PrintOrderBinderyBase} from '../database-models/print-order-bindery-base';
import {BinderyBase} from '../database-models/bindery-base';
import {PoBase} from '../database-models/po-base';
import {SubBinderyBase} from '../database-models/sub-bindery-base';
//Generated Imports
export class PrintOrderBindery extends PrintOrderBinderyBase 
{




//#region Generated Reference Properties
//#region bindery Prop
bindery : BinderyBase;
//#endregion bindery Prop
//#region po Prop
po : PrintOrderBase;
//#endregion po Prop
//#region subBindery Prop
subBindery : SubBinderyBase;
//#endregion subBindery Prop

//#endregion Generated Reference Properties
}