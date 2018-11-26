import { FormBuilderConfiguration } from '../models/form-builder-configuration'
import { AutoInstanceConfig } from '../models/interface/auto-instance-config.interface'
import { defaultContainer } from '../core/defaultContainer';
import { ARRAY_PROPERTY, OBJECT_PROPERTY, PROPERTY } from "../const"
export class BaseFormBuilder{
  constructor(){
  }

  protected createInstance() {
    let instance = {};
    defaultContainer.modelIncrementCount = defaultContainer.modelIncrementCount+ 1;
    let modelName = `RxWebModel${defaultContainer.modelIncrementCount}`
    instance.constructor = Function(`"use strict";return(function ${modelName}(){ })`)()
    return instance;
  }

   protected createClassObject(model:any,formBuilderConfiguration:FormBuilderConfiguration,classInstance?:any){
         let instanceContainer = defaultContainer.get(model);
         let autoInstanceConfig : AutoInstanceConfig = formBuilderConfiguration ? formBuilderConfiguration.autoInstanceConfig : undefined;
         if(!autoInstanceConfig){
            return classInstance && typeof classInstance != "function" ? classInstance : this.getInstance(model,[]);
         }else{
                classInstance = classInstance && typeof classInstance != "function" ? classInstance : this.getInstance(model,autoInstanceConfig.arguments || [])
                if(autoInstanceConfig.objectPropInstanceConfig && autoInstanceConfig.objectPropInstanceConfig.length > 0){
                    autoInstanceConfig.objectPropInstanceConfig.forEach(t =>{
                        let objectProperty = instanceContainer.properties.filter(property => property.name == t.propertyName  && property.propertyType == OBJECT_PROPERTY)[0];
                          if(objectProperty)
                            classInstance[t.propertyName] = this.getInstance(objectProperty.entity,t.arguments || []);
                    })
                }
                if(autoInstanceConfig.arrayPropInstanceConfig && autoInstanceConfig.arrayPropInstanceConfig.length > 0){
                      autoInstanceConfig.arrayPropInstanceConfig.forEach(t=>{
                          let property = instanceContainer.properties.filter(property => property.name == t.propertyName  && property.propertyType == ARRAY_PROPERTY)[0];
                          if(property){
                            classInstance[t.propertyName] = [];
                            for(var i=0;i<t.rowItems;i++){
                                classInstance[t.propertyName].push(this.getInstance(property.entity,t.arguments || []))
                            }
                          }
                      })
                }
                return classInstance;
          }
    }

    protected updateObject(model:any,entityObject:any){
        let instanceContainer = defaultContainer.get(model);
        let classInstance = this.getInstance(model,[]);
        if(instanceContainer){
          instanceContainer.properties.forEach(t=>{
              switch(t.propertyType){
                case PROPERTY:
                  classInstance[t.name] = entityObject[t.name]
                break;
                case OBJECT_PROPERTY:
                  if(entityObject[t.name])
                      classInstance[t.name] = this.updateObject(t.entity,entityObject[t.name])
                break;
                case ARRAY_PROPERTY:
                if(entityObject[t.name] && Array.isArray(entityObject[t.name])){
                 classInstance[t.name] = [];
                 for(let row of entityObject[t.name]){
                      let instanceObject = this.updateObject(t.entity,row)
                      classInstance[t.name].push(instanceObject);
                  }
                }
                break;
              }
          })
        }
      return classInstance;
    }

    private getInstance(model:any,objectArguments:any[]){
      let classInstance =Object.create(model.prototype)
         model.apply(classInstance,objectArguments);
         return classInstance;
   }

}
