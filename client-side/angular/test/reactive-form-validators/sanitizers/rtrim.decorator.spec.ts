
import { RxFormBuilder, rtrim, prop, RxFormGroup } from '@rxweb/reactive-form-validators';



export class User {

    @prop()
    @rtrim()
    userName: string;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('rtrimDecorator', () => {


            it('should pass.',
                () => {
                    let user = new User();
                    user.userName = "ajay          ";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.modelInstance.userName).toEqual("ajay");
                });


            it('should pass and value is "          ajay          ".',
                () => {
                    let user = new User();
                    user.userName = "          ajay          ";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.modelInstance.userName).toEqual("          ajay");
                });

            it('should pass with setValue method.',
                () => {
                    let formGroup = <RxFormGroup>formBuilder.formGroup(User);
                    formGroup.controls.userName.setValue("          ajay          ");
                    expect(formGroup.modelInstance.userName).toEqual("          ajay");
                });

            //end
        });
    });
})();
