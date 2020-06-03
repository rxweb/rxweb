import { InstanceArgument } from './instance-argument.interface';
import { ObjectPropInstanceConfig } from './object-prop-instance-config.interface'
import { ArrayPropInstanceConfig } from './array-prop-instance-config.interface';

export interface AutoInstanceConfig extends InstanceArgument {

  objectPropInstanceConfig?:ObjectPropInstanceConfig[];

  arrayPropInstanceConfig?:ArrayPropInstanceConfig[];
}
