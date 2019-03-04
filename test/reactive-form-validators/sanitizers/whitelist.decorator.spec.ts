
import { RxFormBuilder, whitelist, prop, RxFormGroup } from '../../../packages/reactive-form-validators';



export class User {

    @prop()
    @whitelist("abc")
    userName: string;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('whitelistDecorator', () => {


            it('should pass.',
                () => {
                    let user = new User();
                    user.userName = "aaaaaaaabbbbbbbbbbbb";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.modelInstance.userName).toEqual("aaaaaaaabbbbbbbbbbbb");
                });


            it('should pass and value is "aaaaaaaaabbbbbbbbbbbbcccccccccccssssssssssxxxxxxxxxxx".',
                () => {
                    let user = new User();
                    user.userName = "aaaaaaaaabbbbbbbbbbbbcccccccccccssssssssssxxxxxxxxxxx";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.modelInstance.userName).toEqual("aaaaaaaaabbbbbbbbbbbbccccccccccc");
                });

            it('should pass with setValue method.',
                () => {
                    let formGroup = <RxFormGroup>formBuilder.formGroup(User);
                    formGroup.controls.userName.setValue("Zullu");
                    expect(formGroup.modelInstance.userName).toEqual("");
                });

            //end
        });
    });
})();
