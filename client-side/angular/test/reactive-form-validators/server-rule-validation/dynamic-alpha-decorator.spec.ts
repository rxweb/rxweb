import { prop ,ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '@rxweb/reactive-form-validators';


export class AddressInfo {

	@prop() 
    countryName: string;

    //If you want to apply conditional expression of type 'function'
	@prop()
	countryCode: string;

	//If you want to apply conditional expression of type 'string'
	@prop() 
	cityName: string;

	@prop()
	stateName: string;

	@prop()
    stateCode: string;
    
}

    describe('Dyanmic-alpha-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "alpha": "Only alphabets are allowed.",
          }
        });
      });
      describe('alphaDynamic validation', () => {
        let addressInfo = new AddressInfo();    
        it('should not error in countryName in dynamic alpha validation.',
          () => {             
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
              countryName : {
                  alpha : true  
              },
          };
          let addressInfoFormGroup = <RxFormGroup>formBuilder.formGroup(addressInfo,formBuilderConfiguration);
          addressInfoFormGroup.controls.countryName.setValue('India');
          expect(addressInfoFormGroup.controls.countryName.errors).toBeNull();
          });
          
          it('should error in countryName in dynamic alpha validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
              countryName : {
                  alpha : true  
              }
          }; 
          let addressInfoFormGroup = <RxFormGroup>formBuilder.formGroup(addressInfo,formBuilderConfiguration);
          addressInfoFormGroup.controls.countryName.setValue('@India');
          expect(addressInfoFormGroup.controls.countryName.errors).toEqual({'alpha':{ message: 'Only alphabets are allowed.', refValues: [ '@India' ] } });
          });

          it('should not error in countryCode with conditional expression in dynamic alpha validation with string.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                countryName : {
                    alpha : true  
                },
                countryCode : {
                  alpha :  {conditionalExpression:'x, y => x.countryName == "Australia" ',} 
              },
          }; 
          let addressInfoFormGroup = <RxFormGroup>formBuilder.formGroup(addressInfo,formBuilderConfiguration);
          addressInfoFormGroup.controls.countryName.setValue('Australia');
          addressInfoFormGroup.controls.countryCode.setValue('AU');
          expect(addressInfoFormGroup.controls.countryCode.errors).toBeNull();
          });       
          
          it('should not error in countryCode with conditional expression in dynamic alpha validation with string.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                countryName : {
                    alpha : true  
                },
                countryCode : {
                  alpha :  {conditionalExpression:'x, y => x.countryName == "Australia" ',} 
              },
          }; 
          let addressInfoFormGroup = <RxFormGroup>formBuilder.formGroup(addressInfo,formBuilderConfiguration);
          addressInfoFormGroup.controls.countryName.setValue('India');
          addressInfoFormGroup.controls.countryCode.setValue('@AU');
          expect(addressInfoFormGroup.controls.countryCode.errors).toBeNull();
          });

          it('should error in countryCode with conditional expression in dynamic alpha validation with string.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                countryName : {
                    alpha : true  
                },
                countryCode : {
                  alpha :  {conditionalExpression:'x, y => x.countryName == "Australia" ',} 
              },
          }; 
          let addressInfoFormGroup = <RxFormGroup>formBuilder.formGroup(addressInfo,formBuilderConfiguration);
          addressInfoFormGroup.controls.countryName.setValue('Australia');
          addressInfoFormGroup.controls.countryCode.setValue('@AU');
          expect(addressInfoFormGroup.controls.countryCode.errors).toEqual({'alpha':{ message: 'Only alphabets are allowed.', refValues: [ '@AU' ] } });
          });
            
          it('should not error in stateName allowing whitespace in dynamic alpha validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
                stateName : {
                    alpha :  {allowWhiteSpace:true,} 
                },
          }; 
          let addressInfoFormGroup = <RxFormGroup>formBuilder.formGroup(addressInfo,formBuilderConfiguration);
          addressInfoFormGroup.controls.stateName.setValue('New Mexico');
          expect(addressInfoFormGroup.controls.stateName.errors).toBeNull();
          });

          it('should error in stateCode adding custom message in dynamic alpha validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                stateCode : {
                    alpha :  {message:'You can enter only alphabets.',} 
                },
          }; 
          let addressInfoFormGroup = <RxFormGroup>formBuilder.formGroup(addressInfo,formBuilderConfiguration);
          addressInfoFormGroup.controls.stateCode.setValue('@NM');
          expect(addressInfoFormGroup.controls.stateCode.errors).toEqual({'alpha':{ message: 'You can enter only alphabets.', refValues: [ '@NM' ] } });
          });
           
       })
    });
