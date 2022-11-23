
import { RxFormBuilder, toBoolean, prop, RxFormGroup } from '@rxweb/reactive-form-validators';



export class Product {

    @prop()
    @toBoolean()
    active: any;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('toBooleanDecorator', () => {


            it('should pass.',
                () => {
                    let product = new Product();
                    product.active = "1";
                    let formGroup = formBuilder.formGroup(product);
                    expect(formGroup.controls.active.value).toEqual(true);
                });


            it('should pass with zero string value.',
                () => {
                    let product = new Product();
                    product.active = "0";
                    let formGroup = formBuilder.formGroup(product);
                    expect(formGroup.controls.active.value).toEqual(false);
                });

                
               
            it('should pass with setValue method.',
                () => {
                    let formGroup = <RxFormGroup>formBuilder.formGroup(Product);
                    formGroup.controls.active.setValue("1");
                    expect(formGroup.modelInstance.active).toEqual(true);
                });

            //end
        });
    });
})();
