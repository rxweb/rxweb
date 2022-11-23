
import { RxFormGroup, RxFormBuilder, suffix, prop } from '@rxweb/reactive-form-validators';



export class User {

    @prop()
    @suffix("OG")
    userName: string;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('suffixDecorator', () => {

            it('should pass.',
                () => {
                    let user = new User();
                    user.userName = "john";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.modelInstance.userName).toEqual("johnOG");
                });


            it('value should be blank',
                () => {
                    let user = new User();
                    user.userName = "";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.modelInstance.userName).toEqual("");
                });
            //end
        });
    });
})();
