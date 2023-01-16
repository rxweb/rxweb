import { UpdateOnConfig } from '../../models/config/update-on-config';
import { AnnotationTypes } from '../../core/validator.static';
import { baseDecoratorFunction } from '../base-decorator.function';
export function updateOn(config: UpdateOnConfig) {
    return baseDecoratorFunction(AnnotationTypes.updateOn, config);
}