import {DataItemBase} from '../database-models/data-item-base';
import {DataItemOwnerBase} from '../database-models/data-item-owner-base';
import {DataItemTypeBase} from '../database-models/data-item-type-base';
import {ParentDataItemBase} from '../database-models/parent-data-item-base';
import {ProjectCustomFieldBase} from '../database-models/project-custom-field-base';
import {DataItemAttributePairBase} from '../database-models/data-item-attribute-pair-base';
import {VendorDataItemBase} from '../database-models/vendor-data-item-base';
import {JobDataItemBase} from '../database-models/job-data-item-base';
import {UserDataItemBase} from '../database-models/user-data-item-base';
//Generated Imports
export class DataItem extends DataItemBase 
{




//#region Generated Reference Properties
//#region dataItemOwner Prop
dataItemOwner : UserBase;
//#endregion dataItemOwner Prop
//#region dataItemType Prop
dataItemType : DataItemTypeBase;
//#endregion dataItemType Prop
//#region parentDataItem Prop
parentDataItem : DataItemBase;
//#endregion parentDataItem Prop
//#region projectCustomFields Prop
projectCustomFields : ProjectCustomFieldBase[];
//#endregion projectCustomFields Prop
//#region dataItemAttributePairs Prop
dataItemAttributePairs : DataItemAttributePairBase[];
//#endregion dataItemAttributePairs Prop
//#region vendorDataItems Prop
vendorDataItems : VendorDataItemBase[];
//#endregion vendorDataItems Prop
//#region jobDataItems Prop
jobDataItems : JobDataItemBase[];
//#endregion jobDataItems Prop
//#region userDataItems Prop
userDataItems : UserDataItemBase[];
//#endregion userDataItems Prop
//#region dataItems Prop
dataItems : DataItemBase[];
//#endregion dataItems Prop

//#endregion Generated Reference Properties
}