import { defaultContainer } from "../core/defaultContainer"

export class BaseFormBuilder{
  constructor(){
  }

  protected createInstance() {
    let instance = {};
    defaultContainer.modelIncrementCount = defaultContainer.modelIncrementCount+ 1;
    let modelName = `RxWebModel${defaultContainer.modelIncrementCount}`
    instance.constructor = eval(`function ClassGenerator(){ return (function () {     return  function ${modelName}() {        }}())} ClassGenerator()`)
    return instance;
  }
}
