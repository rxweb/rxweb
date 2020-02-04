import {FormGroup, FormControl, Validators } from '@angular/forms';
import {NumericValueType, RxwebValidators, ReactiveFormConfig, RxFormBuilder, FormGroupExtension, RxFormControl, RxFormArray } from '@rxweb/reactive-form-validators';
import { tick,fakeAsync } from '@angular/core/testing';
describe('Validator', () => {
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "alphaNumeric": "Only alphanumerics are allowed.",
                "required": "This field is required",
                "digit": "Only digits are allowed"
            }
        });
    });
    describe('rx_form_builder_spec', () => {


        it("should not error, alphaNumeric validator with rxFormBuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    'areaName': ['Mumbai', RxwebValidators.alphaNumeric()]
                })
                expect(formGroup.controls.areaName.errors).toBeNull();
            });

        it("should error ,alphaNumeric validator with rxFormBuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    'areaName': ['@Mumbai', RxwebValidators.alphaNumeric()]
                })
                expect(formGroup.controls.areaName.errors).toEqual({ 'alphaNumeric': { message: 'Only alphanumerics are allowed.', refValues: ['@Mumbai'] } });
            });

        it("should not error ,alphaNumeric validator with rxFormBuilder allowWhiteSpace true.",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    'flatAddress': ['', RxwebValidators.alphaNumeric({ allowWhiteSpace: true })]
                });
                formGroup.controls.flatAddress.setValue('Victoria Park');
                expect(formGroup.controls.flatAddress.errors).toBeNull();
            });

        it("Should not error, alphaNumeric validator Conditional Expression with type 'function' using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    'areaName': [''],
                    'countryCode': ['', RxwebValidators.alphaNumeric({ conditionalExpression: (x, y) => x.areaName == "Delhi" })]
                });
                formGroup.controls.areaName.setValue('Mumbai')
                formGroup.controls.countryCode.setValue("@AU")
                expect(formGroup.controls.countryCode.errors).toBeNull();
            });
        it("Should not error, alphaNumeric validator Conditional Expression with type 'string' using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    'areaName': [''],
                    'countryCode': ['', RxwebValidators.alphaNumeric({ conditionalExpression: 'x => x.areaName == "Delhi"' })]
                });
                formGroup.controls.areaName.setValue('Mumbai');
                formGroup.controls.countryCode.setValue("@AU")
                expect(formGroup.controls.countryCode.errors).toBeNull();
            });
        it("Should not error, alphaNumeric validator Conditional Expression with type 'function' using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    'areaName': '',
                    'countryCode': ['', RxwebValidators.alphaNumeric({ conditionalExpression: (x, y) => x.areaName == "Delhi" })]
                });
                formGroup.controls.areaName.setValue('Delhi')
                formGroup.controls.countryCode.setValue("AU")
                expect(formGroup.controls.countryCode.errors).toBeNull();
            });
        it("Should not error, alphaNumeric validator Conditional Expression with type 'string' using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    'areaName': 'Delhi',
                    'countryCode': ['', RxwebValidators.alphaNumeric({ conditionalExpression: 'x => x.areaName == "Delhi"' })]
                });
                formGroup.controls.countryCode.setValue("AU");
                expect(formGroup.controls.countryCode.errors).toBeNull();
            });

        it("Should error, alphaNumeric validator Conditional Expression with type 'function' using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    'areaName': 'Delhi',
                    'countryCode': ['', RxwebValidators.alphaNumeric({ conditionalExpression: (x, y) => x.areaName == "Delhi" })]
                });
                formGroup.controls.countryCode.setValue('@AU');
                expect(formGroup.controls.countryCode.errors).toEqual({ 'alphaNumeric': { message: 'Only alphanumerics are allowed.', refValues: ['@AU'] } });
            });

        it("Should error, alphaNumeric validator Conditional Expression with type 'string' using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    'areaName': [''],
                    'countryCode': ['', RxwebValidators.alphaNumeric({ conditionalExpression: 'x => x.areaName == "Delhi"' })]
                });
                formGroup.controls.areaName.setValue('Delhi');
                formGroup.controls.countryCode.setValue('@AU');
                expect(formGroup.controls.countryCode.errors).toEqual({ 'alphaNumeric': { message: 'Only alphanumerics are allowed.', refValues: ['@AU'] } });
            });
        it("Should error, alphaNumeric validator Shows custom message using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    postalAddress: ['', RxwebValidators.alphaNumeric({ message: 'Please enter only alphanumerics, special characters are not allowed.' })],
                });
                formGroup.controls.postalAddress.setValue('16 amphi-theatre');
                expect(formGroup.controls.postalAddress.errors).toEqual({ 'alphaNumeric': { message: 'Please enter only alphanumerics, special characters are not allowed.', refValues: ['16 amphi-theatre'] } });
            });
        it("should be valid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    firstName: ['', Validators.required],
                });
                formGroup.controls.firstName.setValue('ajay');
                expect(formGroup.controls.firstName.valid).toBe(true);
            })
        it("should be invalid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    firstName: ['', Validators.required],
                });
                formGroup.controls.firstName.setValue('');
                expect(formGroup.controls.firstName.valid).toBe(false);
            })
        it("should be valid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    firstName: ['', Validators.pattern('^[A-Za-z]+$')],
                });
                formGroup.controls.firstName.setValue('ajay');
                expect(formGroup.controls.firstName.valid).toBe(true);
            })
        it("should be invalid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    firstName: ['', Validators.pattern('^[A-Za-z]+$')],
                });
                formGroup.controls.firstName.setValue('ajay@123');
                expect(formGroup.controls.firstName.valid).toBe(false);
            })
        it("should be valid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    firstName: ['', Validators.minLength(5)],
                });
                formGroup.controls.firstName.setValue('samanthaRuthPrabhu');
                expect(formGroup.controls.firstName.valid).toBe(true);
            })
        it("should be invalid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    firstName: ['', Validators.minLength(5)],
                });
                formGroup.controls.firstName.setValue('ajay');
                expect(formGroup.controls.firstName.valid).toBe(false);
            })
        it("should be valid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    firstName: ['', Validators.minLength(5)],
                    lastName: ['', Validators.min(5)]
                });
                formGroup.controls.firstName.setValue('samanthaRuthPrabhu');
                formGroup.controls.lastName.setValue('Khandelwal')
                expect(formGroup.controls.firstName.valid).toBe(true);
            })
        it("should be invalid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    firstName: ['', Validators.minLength(5)],
                    lastName: ['', Validators.min(5)]
                });
                formGroup.controls.firstName.setValue('ajay');
                formGroup.controls.lastName.setValue('ojha')
                expect(formGroup.controls.firstName.valid).toBe(false);
            })

        it("should be valid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    firstName: ['', Validators.maxLength(10)],
                    lastName: ['', Validators.max(5)]
                });
                formGroup.controls.firstName.setValue('Bharat');
                formGroup.controls.lastName.setValue('Patel')
                expect(formGroup.controls.firstName.valid).toBe(true);
            })
        it("should be invalid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    firstName: ['', Validators.maxLength(10)],
                    lastName: ['', Validators.max(5)]
                });
                formGroup.controls.firstName.setValue('samanthaRuthPrabhu');
                formGroup.controls.lastName.setValue('Khandelwal')
                expect(formGroup.controls.firstName.valid).toBe(false);
            })
        it("should be valid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    email: ['', Validators.email]
                });
                formGroup.controls.email.setValue('bharatpatel@gmail.com');
                expect(formGroup.controls.email.valid).toBe(true);
            })
        it("should be invalid, validators of angular using rxFormbuilder",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    email: ['', Validators.email]
                });
                formGroup.controls.email.setValue('bharatpatelgmail.com');
                expect(formGroup.controls.email.valid).toBe(false);
            });

        it("should not error using nested formGroup in rxFormBuilder", () => {
            let formBuilder = new RxFormBuilder();
            let formGroup = formBuilder.group({
                firstName: new FormControl('', RxwebValidators.required()),
                lastName: new FormControl('', RxwebValidators.required()),
                addressFormGroup: formBuilder.group({
                    street: new FormControl('', RxwebValidators.alphaNumeric()),
                    zipcode: new FormControl('', RxwebValidators.digit())
                })
            })
            formGroup.controls.firstName.setValue('Bharat');
            expect(formGroup.controls.firstName.errors).toBeNull();
            formGroup.controls.lastName.setValue('Patel');
            expect(formGroup.controls.lastName.errors).toBeNull();

            let address = formGroup.controls.addressFormGroup['controls'];
            address.street.setValue('VictoriaLake');
            expect(address.street.errors).toBeNull();
            address.zipcode.setValue('10001');
            expect(address.zipcode.errors).toBeNull();
        });

        it("should error using nested formGroup in rxFormBuilder", () => {
            let formBuilder = new RxFormBuilder();
            let formGroup = formBuilder.group({
                firstName: new FormControl('', RxwebValidators.required()),
                lastName: new FormControl('', RxwebValidators.required()),
                addressFormGroup: formBuilder.group({
                    street: new FormControl('', RxwebValidators.alphaNumeric()),
                    zipcode: new FormControl('', RxwebValidators.digit())
                })
            })
            formGroup.controls.firstName.setValue('');
            expect(formGroup.controls.firstName.errors).toEqual({ 'required': { message: 'This field is required', refValues: [] } });
            formGroup.controls.lastName.setValue('');
            expect(formGroup.controls.lastName.errors).toEqual({ 'required': { message: 'This field is required', refValues: [] } });
            let address = formGroup.controls.addressFormGroup['controls'];
            address.street.setValue('Victoria-Lake');
            expect(address.street.errors).toEqual({ 'alphaNumeric': { message: 'Only alphanumerics are allowed.', refValues: ['Victoria-Lake'] } });
            address.zipcode.setValue('A10001');
            expect(address.zipcode.errors).toEqual({ 'digit': { message: 'Only digits are allowed', refValues: ['A10001'] } });
        })

        it("should display error", () => {
            let formBuilder = new RxFormBuilder();
            let formGroup = formBuilder.group({
                firstName: ['', RxwebValidators.required()],
                lastName: ['', RxwebValidators.required()]
            });
            let errorobject = { firstName: "This field is required", lastName: "This field is required" };
            formGroup.controls.firstName.setValue('');
            formGroup.controls.lastName.setValue('');
            let errorObject = (<FormGroupExtension>formGroup).getErrorSummary(true);
            expect(errorObject).toEqual(errorobject);
        })

        it("should defined dob",
            () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    dob: new Date()
                })
                expect(formGroup.controls.dob instanceof RxFormControl).toBe(true);
            });

//issue : https://github.com/rxweb/rxweb/issues/161
            it("should validate nested formgroup, formcontrol with conditional expression",
            fakeAsync( () => {
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    nested: formBuilder.group({
                typeValue:[''],
                value:['',[
                   
                  RxwebValidators.numeric({
                            conditionalExpression: (x, y) => {
                                return x.typeValue === '1';
                            },
                            acceptValue: NumericValueType.PositiveNumber,
                            allowDecimal: false,
                            message: 'Positive Integer'
                        }),
                            RxwebValidators.numeric({
                                conditionalExpression: (x, y) => {
                                    return x.typeValue === '2';
                                },
                                isFormat: true,
                                digitsInfo: '1.0-2',
                                allowDecimal: true,
                            message: 'Positive Decimal',
                            }),
                  RxwebValidators.required({
                            conditionalExpression: (x, y) => {
                                return y.nested.typeValue === '3';
                            },  
                            message: 'Field Required'
                        })]]
                    })      
                }) 
                let nestedFormGroup = formGroup.controls.nested as FormGroup;
                expect(nestedFormGroup.controls.value.errors).toBeNull();
                nestedFormGroup.controls.typeValue.setValue('3');
                tick(1000);
                expect(nestedFormGroup.controls.value.errors != null).toBeTruthy();
                
            }));

        //issue : https://github.com/rxweb/rxweb/issues/269
        it("should defined Date",
            () => {
                let date = new Date();
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    date: [new Date(), [RxwebValidators.required()]]
                })
                expect(formGroup.controls.date instanceof RxFormControl).toBe(true);
                expect(formGroup.controls.date.value).toEqual(date);
            });

        //issue : https://github.com/rxweb/rxweb/issues/276
        it("should define nested formarray with zero controls",
            () => {
                let date = new Date();
                let formBuilder = new RxFormBuilder();
                let formGroup = formBuilder.group({
                    addresses: []
                })
                let formArray = formGroup.controls.addresses as RxFormArray;
                expect(formGroup.controls.addresses instanceof RxFormArray).toBe(true);
                expect(formArray.controls.length).toEqual(0);
            });
    });
});
