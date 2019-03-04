
import { RxFormBuilder, trim, prop, RxFormGroup } from '../../../packages/reactive-form-validators';



export class User {

    @prop()
    @trim()
    userName: string;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('trimDecorator', () => {


            it('should pass.',
                () => {
                    let user = new User();
                    user.userName = "                ";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.modelInstance.userName).toEqual("");
                });


            it('should pass and value is "ajay".',
                () => {
                    let user = new User();
                    user.userName = "      ajay          ";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.modelInstance.userName).toEqual("ajay");
                });

            it('should pass with setValue method.',
                () => {
                    let formGroup = <RxFormGroup>formBuilder.formGroup(User);
                    formGroup.controls.userName.setValue("       ajay             ");
                    expect(formGroup.modelInstance.userName).toEqual("ajay");
                });

            //end
        });
    });
})();
