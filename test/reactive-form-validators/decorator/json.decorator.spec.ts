import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  json,prop } from    '../../../packages/reactive-form-validators';  

export class JsonInfo {

	@prop()
	location: string;

	@json({conditionalExpression:(x,y)=> x.location == "{'CountryName':'India'}"  }) 
	addressJson: string;

	@json({conditionalExpression:'x => x.location == "{CountryName:India}"'  ,message:'Enter the text in JSON format --> {key:value}' }) 
	locationJson: string;

	@json({message:'Enter only JSON type data' }) 
	contactJson: string;

}
(function() {
    describe('Decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "Json":"Invalid json format",
          }
        });
      });   
  
      describe('jsonDecorator', () => {

       it("Should not error, Json decorator Conditional Expression with type 'function'",
       () => {
       let jsonInfo = new JsonInfo();
       let formGroup = formBuilder.formGroup(jsonInfo);
       formGroup.controls.location.setValue("{'CountryName':'India'}");
       formGroup.controls.addressJson.setValue("{'Country':'India'}");
       expect(formGroup.controls.addressJson.errors).toBeNull();
      });

      })
    })
})();
