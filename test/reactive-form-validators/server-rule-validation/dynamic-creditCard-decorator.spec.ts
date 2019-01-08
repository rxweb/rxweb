import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';


export class User {

	@prop()
	cardType: string;

	@prop()
	otherVisaCard: string;

	@prop()
	americanExpressCard: string;

	@prop()
	maestroCard: string;

	@prop()
	jcbCard: string;

	@prop()
	discoverCard: string;

	@prop()
	masterCard: string;

	@prop()
	dinersClubCard: string;

}

(function() {
    describe('Dyanmic-credit-card-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "creditCard": "Invalid creditcard no.",
          }
        });
      });
      describe('creditCardDecorator', () => {

        it("Should error, creditCard decorator Conditional Expression with type 'string'",
        () => {
          let user = new User();
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
            cardType:{},
            otherVisaCard:{
              creditCard:{
                fieldName:"cardType",
                conditionalExpression:"x => x.cardType == \"Visa\"",
                message:"Invalid Visa Credit Card Number."
              }
            }
       };

        let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        formGroup.controls.cardType.setValue('Visa');
        formGroup.controls.otherVisaCard.setValue('1214210');
        expect(formGroup.controls.otherVisaCard.errors).toEqual({'creditCard':{ message: 'Invalid Visa Credit Card Number.', refValues: [ '1214210','Visa' ] } });
       });

       it("Should not error, creditCard decorator Conditional Expression with type 'string'",
       () => {
        let user = new User();
           let formBuilderConfiguration = new FormBuilderConfiguration();
           formBuilderConfiguration.dynamicValidation = {
           cardType:{},otherVisaCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"Visa\"",message:"Invalid Visa Credit Card Number."}}
      };

       let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
       formGroup.controls.cardType.setValue('AmericanExpress');
       formGroup.controls.otherVisaCard.setValue('1214210');
       expect(formGroup.controls.otherVisaCard.errors).toBeNull();
      });

      it("Should not error, creditCard decorator Conditional Expression with type 'string'",
       () => {
        let user = new User();
           let formBuilderConfiguration = new FormBuilderConfiguration();
           formBuilderConfiguration.dynamicValidation = {
           cardType:{},otherVisaCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"Visa\"",message:"Invalid Visa Credit Card Number."}}
      };

       let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
       formGroup.controls.cardType.setValue('Visa');
       formGroup.controls.otherVisaCard.setValue('4111111111111111');
       expect(formGroup.controls.otherVisaCard.errors).toBeNull();
      });

      it("Should error, creditCard decorator Conditional Expression with type 'string'",
      () => {
        let user = new User();
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            cardType:{},americanExpressCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"AmericanExpress\""}}
     };

      let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
      formGroup.controls.cardType.setValue('AmericanExpress');
      formGroup.controls.americanExpressCard.setValue('1214210');
      expect(formGroup.controls.americanExpressCard.errors).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ '1214210','AmericanExpress' ] } });
     });

     it("Should not error, creditCard decorator Conditional Expression with type 'string'",
     () => {
      let user = new User();
         let formBuilderConfiguration = new FormBuilderConfiguration();
         formBuilderConfiguration.dynamicValidation = {
            cardType:{},americanExpressCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"AmericanExpress\""}}
    };

     let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
     formGroup.controls.cardType.setValue('visa');
     formGroup.controls.americanExpressCard.setValue('1214210');
     expect(formGroup.controls.americanExpressCard.errors).toBeNull();
    });

    it("Should not error, creditCard decorator Conditional Expression with type 'string'",
     () => {
      let user = new User();
         let formBuilderConfiguration = new FormBuilderConfiguration();
         formBuilderConfiguration.dynamicValidation = {
         cardType:{},americanExpressCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"AmericanExpress\""}}
    };

     let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
     formGroup.controls.cardType.setValue('AmericanExpress');
     formGroup.controls.americanExpressCard.setValue('340000000000009');
     expect(formGroup.controls.americanExpressCard.errors).toBeNull();
    });

    it("Should error, creditCard decorator Conditional Expression with type 'string'",
    () => {
      let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
          cardType:{},maestroCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"Maestro\""}}
   };

    let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
    formGroup.controls.cardType.setValue('Maestro');
    formGroup.controls.maestroCard.setValue('1214210');
    expect(formGroup.controls.maestroCard.errors).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ '1214210','Maestro' ] } });
   });

   it("Should not error, creditCard decorator Conditional Expression with type 'string'",
   () => {
    let user = new User();
       let formBuilderConfiguration = new FormBuilderConfiguration();
       formBuilderConfiguration.dynamicValidation = {
          cardType:{},maestroCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"Maestro\""}}
  };

   let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
   formGroup.controls.cardType.setValue('visa');
   formGroup.controls.maestroCard.setValue('1214210');
   expect(formGroup.controls.maestroCard.errors).toBeNull();
  });

  it("Should not error, creditCard decorator Conditional Expression with type 'string'",
   () => {
    let user = new User();
       let formBuilderConfiguration = new FormBuilderConfiguration();
       formBuilderConfiguration.dynamicValidation = {
       cardType:{},maestroCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"Maestro\""}}
  };

   let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
   formGroup.controls.cardType.setValue('Maestro');
   formGroup.controls.maestroCard.setValue('6763249832910589');
   expect(formGroup.controls.maestroCard.errors).toBeNull();
  });
///
  it("Should error, creditCard decorator Conditional Expression with type 'string'",
  () => {
    let user = new User();
      let formBuilderConfiguration = new FormBuilderConfiguration();
      formBuilderConfiguration.dynamicValidation = {
        cardType:{},jcbCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"JCB\""}}
 };

  let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
  formGroup.controls.cardType.setValue('JCB');
  formGroup.controls.jcbCard.setValue('1214210');
  expect(formGroup.controls.jcbCard.errors).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ '1214210','JCB' ] } });
 });

 it("Should not error, creditCard decorator Conditional Expression with type 'string'",
 () => {
  let user = new User();
     let formBuilderConfiguration = new FormBuilderConfiguration();
     formBuilderConfiguration.dynamicValidation = {
        cardType:{},jcbCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"JCB\""}}
};

 let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
 formGroup.controls.cardType.setValue('visa');
 formGroup.controls.jcbCard.setValue('1214210');
 expect(formGroup.controls.jcbCard.errors).toBeNull();
});

it("Should not error, creditCard decorator Conditional Expression with type 'string'",
 () => {
  let user = new User();
     let formBuilderConfiguration = new FormBuilderConfiguration();
     formBuilderConfiguration.dynamicValidation = {
     cardType:{},jcbCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"JCB\""}}
};

 let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
 formGroup.controls.cardType.setValue('JCB');
 formGroup.controls.jcbCard.setValue('3536357376271046');
 expect(formGroup.controls.jcbCard.errors).toBeNull();
});
///
it("Should error, creditCard decorator Conditional Expression with type 'string'",
() => {
  let user = new User();
    let formBuilderConfiguration = new FormBuilderConfiguration();
    formBuilderConfiguration.dynamicValidation = {
      cardType:{},discoverCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"Discover\""}}
};

let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
formGroup.controls.cardType.setValue('Discover');
formGroup.controls.discoverCard.setValue('1214210');
expect(formGroup.controls.discoverCard.errors).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ '1214210','Discover' ] } });
});

it("Should not error, creditCard decorator Conditional Expression with type 'string'",
() => {
  let user = new User();
   let formBuilderConfiguration = new FormBuilderConfiguration();
   formBuilderConfiguration.dynamicValidation = {
      cardType:{},discoverCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"Discover\""}}
};

let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
formGroup.controls.cardType.setValue('visa');
formGroup.controls.discoverCard.setValue('1214210');
expect(formGroup.controls.discoverCard.errors).toBeNull();
});

it("Should not error, creditCard decorator Conditional Expression with type 'string'",
() => {
  let user = new User();
   let formBuilderConfiguration = new FormBuilderConfiguration();
   formBuilderConfiguration.dynamicValidation = {
   cardType:{},discoverCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"Discover\""}}
};

let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
formGroup.controls.cardType.setValue('Discover');
formGroup.controls.discoverCard.setValue('6011275869986382');
expect(formGroup.controls.discoverCard.errors).toBeNull();
});
///
it("Should error, creditCard decorator Conditional Expression with type 'string'",
() => {
  let user = new User();
    let formBuilderConfiguration = new FormBuilderConfiguration();
    formBuilderConfiguration.dynamicValidation = {
      cardType:{},masterCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"MasterCard\""}}
};

let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
formGroup.controls.cardType.setValue('MasterCard');
formGroup.controls.masterCard.setValue('1214210');
expect(formGroup.controls.masterCard.errors).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ '1214210','MasterCard' ] } });
});

it("Should not error, creditCard decorator Conditional Expression with type 'string'",
() => {
  let user = new User();
   let formBuilderConfiguration = new FormBuilderConfiguration();
   formBuilderConfiguration.dynamicValidation = {
      cardType:{},masterCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"MasterCard\""}}
};

let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
formGroup.controls.cardType.setValue('visa');
formGroup.controls.masterCard.setValue('1214210');
expect(formGroup.controls.masterCard.errors).toBeNull();
});

it("Should not error, creditCard decorator Conditional Expression with type 'string'",
() => {
  let user = new User();
   let formBuilderConfiguration = new FormBuilderConfiguration();
   formBuilderConfiguration.dynamicValidation = {
   cardType:{},masterCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"MasterCard\""}}
};

let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
formGroup.controls.cardType.setValue('MasterCard');
formGroup.controls.masterCard.setValue('5475721722707573');
expect(formGroup.controls.masterCard.errors).toBeNull();
});
///
it("Should error, creditCard decorator Conditional Expression with type 'string'",
() => {
  let user = new User();
    let formBuilderConfiguration = new FormBuilderConfiguration();
    formBuilderConfiguration.dynamicValidation = {
      cardType:{},dinersClubCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"DinersClub\""}}
};

let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
formGroup.controls.cardType.setValue('DinersClub');
formGroup.controls.dinersClubCard.setValue('1214210');
expect(formGroup.controls.dinersClubCard.errors).toEqual({'creditCard':{ message: 'Invalid creditcard no.', refValues: [ '1214210','DinersClub' ] } });
});

it("Should not error, creditCard decorator Conditional Expression with type 'string'",
() => {
  let user = new User();
   let formBuilderConfiguration = new FormBuilderConfiguration();
   formBuilderConfiguration.dynamicValidation = {
      cardType:{},dinersClubCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"DinersClub\""}}
};

let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
formGroup.controls.cardType.setValue('visa');
formGroup.controls.dinersClubCard.setValue('1214210');
expect(formGroup.controls.dinersClubCard.errors).toBeNull();
});

it("Should not error, creditCard decorator Conditional Expression with type 'string'",
() => {
  let user = new User();
   let formBuilderConfiguration = new FormBuilderConfiguration();
   formBuilderConfiguration.dynamicValidation = {
   cardType:{},dinersClubCard:{creditCard:{fieldName:"cardType",conditionalExpression:"x => x.cardType == \"DinersClub\""}}
};

let formGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
formGroup.controls.cardType.setValue('DinersClub');
formGroup.controls.dinersClubCard.setValue('30224290621085');
expect(formGroup.controls.dinersClubCard.errors).toBeNull();
});
///
      })
    })
})();