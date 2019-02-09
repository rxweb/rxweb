import { FormBuilder } from "@angular/forms"
import { RxwebValidators,ReactiveFormConfig} from '../../../packages/reactive-form-validators';

(function(){
 describe('conditional expression',()=>{
    beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "alpha": "Only alphabets are allowed.",
          }
        });
      });
  

    let formbuilder = new FormBuilder();
     
  it('should pass.',()=>{
    let userFormGroup= formbuilder.group({
        firstName : ['@ja',RxwebValidators.alpha({conditionalExpression:(x)=>x.firstName == "@jay"})]
    })
    userFormGroup.controls.firstName.setValue('@jay');
    expect(userFormGroup.controls.firstName.errors).toEqual({ 'alpha': { message: 'Only alphabets are allowed.', refValues: ['@jay'] } });
     })

 })
})();