
import { RxFormBuilder, stripLow, prop, RxFormGroup } from '@rxweb/reactive-form-validators';



export class User {

    @prop()
    @stripLow()
    userName: string;

    @prop()
    @stripLow(true)
    fullName: string;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('stripLowDecorator', () => {


            it('should pass.',
                () => {
                    let user = new User();
                    user.userName = "monkey\x00";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.modelInstance.userName).toEqual("monkey");
                });


            

            it('should pass with setValue method.',
                () => {
                    let formGroup = <RxFormGroup>formBuilder.formGroup(User);
                    formGroup.controls.userName.setValue("monkey\x00");
                    expect(formGroup.modelInstance.userName).toEqual("monkey");
                });

            //end
        });
    });
})();
