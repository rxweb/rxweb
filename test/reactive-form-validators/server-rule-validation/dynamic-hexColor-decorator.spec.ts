import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';
import { User } from '../decorator/maxLength.decorator.spec';

export class HexcolorInfo {

	@prop()
	color: string;

	@prop()
	headerHexcolorCode: string;

	@prop()
	bodyHexcolorCode: string;

}
(function() {
    describe('Dyanmic-hexColor-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "hexColor": "Invalid Hex Color format",
          }
        });
     });
  
      describe('hexColorDecorator', () => {
          let hexcolorInfo = new HexcolorInfo();
          it('should not error in color in dynamic hexColor validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                color:{hexColor:true}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(hexcolorInfo,formBuilderConfiguration);
            userInfoFormGroup.controls.color.setValue('#AFAFAF');
            expect(userInfoFormGroup.controls.color.errors).toBeNull();
          });

          it('should error in color in dynamic hexColor- validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                color:{hexColor:true}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(hexcolorInfo,formBuilderConfiguration);
            userInfoFormGroup.controls.color.setValue('AFAF');
            expect(userInfoFormGroup.controls.color.errors).toEqual({'hexColor':{ message: 'Invalid Hex Color format', refValues: [ 'AFAF' ] } });
          });
          it('should not error in headerHexcolorCode with conditional expression in dynamic hexColor validation with string.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                color:{hexColor:true},headerHexcolorCode:{hexColor:{conditionalExpression:"x => x.color == \"#AFAFAF\""}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(hexcolorInfo,formBuilderConfiguration);
            userInfoFormGroup.controls.color.setValue('#AFAFAF');
            userInfoFormGroup.controls.headerHexcolorCode.setValue('#946B2D');
            expect(userInfoFormGroup.controls.headerHexcolorCode.errors).toBeNull();
          });
          it('should not error in headerHexcolorCode with conditional expression in dynamic hexColor validation with string.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                color:{hexColor:true},headerHexcolorCode:{hexColor:{conditionalExpression:"x => x.color == \"#AFAFAF\""}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(hexcolorInfo,formBuilderConfiguration);
            userInfoFormGroup.controls.color.setValue('#946B2D');
            userInfoFormGroup.controls.headerHexcolorCode.setValue('942D');
            expect(userInfoFormGroup.controls.headerHexcolorCode.errors).toBeNull();
          });
          it('should error in headerHexcolorCode with conditional expression in dynamic hexColor validation with string.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                color:{hexColor:true},headerHexcolorCode:{hexColor:{conditionalExpression:"x => x.color == \"#AFAFAF\""}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(hexcolorInfo,formBuilderConfiguration);
            userInfoFormGroup.controls.color.setValue('#AFAFAF');
            userInfoFormGroup.controls.headerHexcolorCode.setValue('942D');
            expect(userInfoFormGroup.controls.headerHexcolorCode.errors).toEqual({'hexColor':{ message: 'Invalid Hex Color format', refValues: [ '942D' ] } });
          });

          it('should error in bodyHexcolorCode custom message in dynamic hexColor validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                bodyHexcolorCode:{hexColor:{message:"Please enter the right format of hexcode for body like \"#AFAFAF\""}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(hexcolorInfo,formBuilderConfiguration);
            userInfoFormGroup.controls.bodyHexcolorCode.setValue('942D');
            expect(userInfoFormGroup.controls.bodyHexcolorCode.errors).toEqual({'hexColor':{ message: 'Please enter the right format of hexcode for body like \"#AFAFAF\"', refValues: [ '942D' ] } });
          });          
      });
    });
})();