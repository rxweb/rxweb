
import { RxFormBuilder, toFloat, prop, RxFormGroup } from '../../../packages/reactive-form-validators';



export class Product {

    @prop()
    @toFloat()
    amount: number;

}




(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();

        describe('toFloatDecorator', () => {


            it('should pass.',
                () => {
                    let product = new Product();
                    product.amount = 15;
                    let formGroup = <RxFormGroup>formBuilder.formGroup(product);
                    expect(formGroup.modelInstance.amount).toEqual(15.0);
                });


            it('should pass with negative value.',
                () => {
                    let product = new Product();
                    product.amount = -1.5;
                    let formGroup = <RxFormGroup>formBuilder.formGroup(product);
                    expect(formGroup.modelInstance.amount).toEqual(-1.5);
                });

                it('should pass with dot.',
                () => {
                    let product = new Product();
                    product.amount = 1.;
                    let formGroup = <RxFormGroup>formBuilder.formGroup(product);
                    expect(formGroup.modelInstance.amount).toEqual(1.0);
                });

                
                it('should pass with only decimal value.',
                () => {
                    let product = new Product();
                    product.amount = .8;
                    let formGroup = <RxFormGroup>formBuilder.formGroup(product);
                    expect(formGroup.modelInstance.amount).toEqual(0.8);
                });

            it('should pass with setValue method.',
                () => {
                    let formGroup = <RxFormGroup>formBuilder.formGroup(Product);
                    formGroup.controls.amount.setValue(2);
                    expect(formGroup.modelInstance.amount).toEqual(2.0);
                });

            //end
        });
    });
})();
