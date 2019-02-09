import { Input } from "@angular/core";
import { AbstractControl } from "@angular/forms"
import {defaultContainer } from "../core/defaultContainer"
import { ARRAY_PROPERTY, OBJECT_PROPERTY, PROPERTY} from "../const"
import { DecoratorConfiguration, InstanceContainer, PropertyInfo } from '../core/validator.interface';
import { ApplicationUtil } from "../util/app-util";
import { TEMPLATE_VALIDATION_CONFIG  } from '../const/app.const'
export abstract class BaseDirective {
    @Input() model:any;
    
    applyValidations(controls:any,model:any = null){
        if(this.model){
            let modelConfig = defaultContainer.get(model || this.model.constructor);
            if(modelConfig){
                modelConfig.properties.forEach(property =>{
                    if(controls[property.name]){
                    switch(property.propertyType) {
                        case PROPERTY:
                            this.setValidatorConfig(controls[property.name],modelConfig,property);
                        break;
                        case OBJECT_PROPERTY:
                            this.applyValidations(controls[property.name].controls,property.entity);
                        break;
                    }
                }
                })
            }
        }
    }

    private setValidatorConfig(control:AbstractControl,modelConfig:InstanceContainer,property:PropertyInfo){
        let annotations= modelConfig.propertyAnnotations.filter(t=> t.propertyName == property.name);
        annotations.forEach(annotation =>{
            if(!control[TEMPLATE_VALIDATION_CONFIG])
            control[TEMPLATE_VALIDATION_CONFIG] = {};
            ApplicationUtil.configureControl(control, annotation.config ? annotation.config : "", annotation.annotationType)
        })
    }
}
