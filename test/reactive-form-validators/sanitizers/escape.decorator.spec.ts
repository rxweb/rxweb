
import { RxFormBuilder, escape, prop, RxFormGroup } from '../../../packages/reactive-form-validators';



export class Content {

    @prop()
    @escape()
    htmlText: string;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('escapeDecorator', () => {


            it('should pass.',
                () => {
                    let content = new Content();
                    content.htmlText = "<html>";
                    let formGroup = <RxFormGroup>formBuilder.formGroup(content);
                    expect(formGroup.modelInstance.htmlText).toEqual("&lt;html&gt;");
                });

            it('should pass with setValue method.',
                () => {
                    let formGroup = <RxFormGroup>formBuilder.formGroup(Content);
                    formGroup.controls.htmlText.setValue("<html>");
                    expect(formGroup.modelInstance.htmlText).toEqual("&lt;html&gt;");
                });

            //end
        });
    });
})();
