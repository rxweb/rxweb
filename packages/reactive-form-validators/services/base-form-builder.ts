import { defaultContainer } from "../core/defaultContainer"

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
}
