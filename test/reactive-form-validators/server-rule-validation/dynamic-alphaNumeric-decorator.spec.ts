import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';

	export class Location {

        @prop()
        areaName: string;
    
        @prop()
        flatAddress: string;
    
        @prop()
        postalAddress: string;
    
        @prop()
        cityCode: string;   
    
}

(function() {
    describe('Dyanmic-alphaNumeric-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "alphaNumeric": "Only alphanumerics are allowed.",
          }
        });
    });
      describe('alphaNumericDecorator', () => {      
        let location = new Location();  
        it('should not error in areaName adding dynamic alphaNumeric validation',
          () => {            
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                areaName : {
                  alphaNumeric : true  
              }
          };
            let loactionInfoFormGroup = <RxFormGroup>formBuilder.formGroup(location,formBuilderConfiguration);
            loactionInfoFormGroup.controls.areaName.setValue('VictoriaPark');
            expect(loactionInfoFormGroup.controls.areaName.errors).toBeNull();
       });
       it('should error in areaName adding dynamic alphaNumeric validation',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                areaName : {
                  alphaNumeric : true  
              }
          };
            let loactionInfoFormGroup = <RxFormGroup>formBuilder.formGroup(location,formBuilderConfiguration);
            loactionInfoFormGroup.controls.areaName.setValue('@Victoria-Park');
            expect(loactionInfoFormGroup.controls.areaName.errors).toEqual({'alphaNumeric':{ message: 'Only alphanumerics are allowed.', refValues: [ '@Victoria-Park' ] } });
       });
       it('should not error in cityCode with conditional expression in dynamic alphaNumeric validation with string.',
       () => {
         let formBuilderConfiguration = new FormBuilderConfiguration();
         formBuilderConfiguration.dynamicValidation = {
             areaName : {
               alphaNumeric : true  
           },
           cityCode : {
            alphaNumeric :  {conditionalExpression:'x => x.areaName =="Boston"',} 
        }
       };
         let loactionInfoFormGroup = <RxFormGroup>formBuilder.formGroup(location,formBuilderConfiguration);
         loactionInfoFormGroup.controls.areaName.setValue('Boston');
         loactionInfoFormGroup.controls.cityCode.setValue('NY');
         expect(loactionInfoFormGroup.controls.cityCode.errors).toBeNull();
    });

    it('should not error in cityCode with conditional expression in dynamic alphaNumeric validation with string.',
       () => {
         let formBuilderConfiguration = new FormBuilderConfiguration();
         formBuilderConfiguration.dynamicValidation = {
             areaName : {
               alphaNumeric : true  
           },
           cityCode : {
            alphaNumeric :  {conditionalExpression:'x => x.areaName =="Boston"',} 
        }
       };
         let loactionInfoFormGroup = <RxFormGroup>formBuilder.formGroup(location,formBuilderConfiguration);
         loactionInfoFormGroup.controls.areaName.setValue('California');
         loactionInfoFormGroup.controls.cityCode.setValue('@NY');
         expect(loactionInfoFormGroup.controls.cityCode.errors).toBeNull();
    });

    it('should error in cityCode with conditional expression in dynamic alphaNumeric validation with string.',
    () => {
      let formBuilderConfiguration = new FormBuilderConfiguration();
      formBuilderConfiguration.dynamicValidation = {
          areaName : {
            alphaNumeric : true  
        },
        cityCode : {
         alphaNumeric :  {conditionalExpression:'x => x.areaName =="Boston"',} 
     }
    };
      let loactionInfoFormGroup = <RxFormGroup>formBuilder.formGroup(location,formBuilderConfiguration);
      loactionInfoFormGroup.controls.areaName.setValue('Boston');
      loactionInfoFormGroup.controls.cityCode.setValue('@NY');
      expect(loactionInfoFormGroup.controls.cityCode.errors).toEqual({'alphaNumeric':{ message: 'Only alphanumerics are allowed.', refValues: [ '@NY' ] } });
 });

 it('should not error in flatAddress allowing whitespace in dynamic alphaNumeric validation.',
 () => {
   let formBuilderConfiguration = new FormBuilderConfiguration();
   formBuilderConfiguration.dynamicValidation = {
    flatAddress : {
        alphaNumeric :  {allowWhiteSpace:true,} 
    },
 };
   let loactionInfoFormGroup = <RxFormGroup>formBuilder.formGroup(location,formBuilderConfiguration);
   loactionInfoFormGroup.controls.flatAddress.setValue('1600 Ampitheatre');
   expect(loactionInfoFormGroup.controls.flatAddress.errors).toBeNull();
});


it('should error in postalAddress adding custom message in dynamic alphaNumeric validation.',
() => {
  let formBuilderConfiguration = new FormBuilderConfiguration();
  formBuilderConfiguration.dynamicValidation = {
    postalAddress : {
        alphaNumeric :  {allowWhiteSpace:true,message:'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.',} 
    },
};
  let loactionInfoFormGroup = <RxFormGroup>formBuilder.formGroup(location,formBuilderConfiguration);
  loactionInfoFormGroup.controls.postalAddress.setValue('1600 Ampi-theatre');
  expect(loactionInfoFormGroup.controls.postalAddress.errors).toEqual({'alphaNumeric':{ message: 'Please enter only alphanumerics, special characters are not allowed and whitespace is allowed.', refValues: [ '1600 Ampi-theatre' ] } });
});

 }); 

})
})();