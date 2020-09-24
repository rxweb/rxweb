import { FormGroup, FormArray} from '@angular/forms';

import { RxFormControl, prop, propObject, required, propArray, email ,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, RxwebValidators } from '@rxweb/reactive-form-validators';


export class Skill {
    @prop()
    name: string;
}
export class Address {

    @prop()
    city: string;

    address: string;
}
export class Person {

    @propObject(Address)
    address: Address;

    @propArray(Skill)
    skills: Skill[];

    @required()
    name: string;
}
export class PersonGroup {
    
    @propObject(Person)
    person1: Person;

    @propObject(Person)
    person2: Person;
}

class Location {
    @required()
    name: string;
}

class Contact extends Location {
    @required()
    type: string;

    @required()
    primary: boolean;
}

export class PhoneNumber extends Contact {
    @required()
    phoneNumber: string;
}

export class Email extends Contact {
    @required()
    @email()
    email: string;
}

export class UserModel {
    @required()
    userName: string;

    @propArray(PhoneNumber)
    phoneNumbers: PhoneNumber[];

    @propObject(Email)
    email: Email;
}




    describe('rx-form-builder', () => {
        let formBuilder = new RxFormBuilder();

        describe('rx-form-builder-function-spec', () => {


            it('should not error, create FormGroup object based on model',
                () => {
                    var formBuilderConfig = new FormBuilderConfiguration();
                    formBuilderConfig.autoInstanceConfig = {
                        objectPropInstanceConfig: [{
                            propertyName: 'address'
                        }],
                        arrayPropInstanceConfig: [{
                            propertyName: 'skills',
                            rowItems: 10
                        }]
                    }
                    let formGroup = <RxFormGroup>formBuilder.formGroup(Person, formBuilderConfig);
                    expect(formGroup.modelInstance.constructor).toEqual(Person);
                    expect(formGroup.modelInstance.address.constructor).toEqual(Address);
                    expect(formGroup.modelInstance.skills[0].constructor).toEqual(Skill);
                    expect(formGroup.modelInstance.skills.length).toEqual(10);
                    expect(formGroup.controls.address.constructor).toEqual(RxFormGroup);

                });

            it('should not error, create formgroup with extended model properties',
                () => {
                    const user = new UserModel();
                    const phoneNumber = new PhoneNumber();

                    user.phoneNumbers = new Array<PhoneNumber>();
                    user.phoneNumbers.push(phoneNumber);

                    user.email = new Email();

                    let formGroup = <RxFormGroup>formBuilder.formGroup(user);
                    expect(formGroup.controls.userName != undefined).toEqual(true);
                    expect(formGroup.controls.phoneNumbers != undefined).toEqual(true);
                    let formArray = <FormArray>formGroup.controls.phoneNumbers;
                    let phoneNumberGroup = formArray.controls[0] as FormGroup;
                    expect(phoneNumberGroup.controls.phoneNumber != undefined).toEqual(true);
                    expect(phoneNumberGroup.controls.type != undefined).toEqual(true);
                    expect(phoneNumberGroup.controls.primary != undefined).toEqual(true);
                    expect(phoneNumberGroup.controls.name != undefined).toEqual(true);

                    let emailFormGroup = formGroup.controls.email as FormGroup;
                    expect(emailFormGroup.controls.email != undefined).toEqual(true);
                    expect(emailFormGroup.controls.primary != undefined).toEqual(true);
                    expect(phoneNumberGroup.controls.type != undefined).toEqual(true);
                    expect(phoneNumberGroup.controls.name != undefined).toEqual(true);

                });


            it('should not error, should map nested object properties value with respective FormControl',
                () => {
                    var formBuilderConfig = new FormBuilderConfiguration();
                    formBuilderConfig.autoInstanceConfig = {
                        objectPropInstanceConfig: [{
                            propertyName: 'address'
                        }],
                        arrayPropInstanceConfig: [{
                            propertyName: 'skills',
                            rowItems: 10
                        }]
                    }
                    let person = new Person();
                    person.name = "John";
                    person.address = new Address();
                    person.address.city = "Boston";
                    person.skills = new Array<Skill>();
                    let skill = new Skill();
                    skill.name = "Angular"
                    person.skills.push(skill);
                    let formGroup = <RxFormGroup>formBuilder.formGroup(person, formBuilderConfig);
                    expect(formGroup.modelInstance.constructor).toEqual(Person);
                    expect(formGroup.modelInstance.address.constructor).toEqual(Address);
                    expect(formGroup.modelInstance.skills[0].constructor).toEqual(Skill);
                    expect(formGroup.modelInstance.skills.length).toEqual(10);
                    expect(formGroup.controls.address.constructor).toEqual(RxFormGroup);
                    let addressFormGroup = formGroup.controls.address as RxFormGroup;
                    let skillsFormArray = formGroup.controls.skills as FormArray;
                    let zeroIndexFormGroup = skillsFormArray.controls[0] as RxFormGroup;
                    expect(formGroup.controls.name.value).toEqual("John");
                    expect(addressFormGroup.controls.city.value).toEqual("Boston");
                    expect(zeroIndexFormGroup.controls.name.value).toEqual("Angular");


                });

            // feature : https://github.com/rxweb/rxweb/issues/268
            it('should define formmcontrol through control method',
                () => {
                    
                    let control = formBuilder.control('India', [RxwebValidators.required()]);
                    expect(control).toBeDefined();
                    expect(control instanceof RxFormControl).toBeTruthy();
                    expect(control.valid).toBeTruthy();
                });

            // feature : https://github.com/rxweb/rxweb/issues/268
            it('should define formarray through array method',
                () => {

                    let array = formBuilder.array([{ name: 'ajay' }]) as FormArray;
                    expect(array).toBeDefined();
                    expect(array instanceof FormArray).toBeTruthy();
                    expect(array.controls.length).toEqual(1);
                    expect(array.controls[0] instanceof RxFormGroup).toBeTruthy();
                });

            // feature : https://github.com/rxweb/rxweb/issues/402
            it("should set updateOn for properties, arrays and objects",
            () => {
                const updateOn: "change" | "blur" | "submit" = "blur";
                const formBuilderConfig: FormBuilderConfiguration = {
                    abstractControlOptions: {
                        address: updateOn,
                        skills: updateOn,
                        name: updateOn,
                    }
                };
                const person: Person = {
                    address: new Address(),
                    skills: new Array<Skill>(),
                    name: "",
                };
                const formGroup = <RxFormGroup>formBuilder.formGroup(Person, person, formBuilderConfig);
                expect(formGroup.controls.address.updateOn).toEqual(updateOn);
                expect(formGroup.controls.skills.updateOn).toEqual(updateOn);
                expect(formGroup.controls.name.updateOn).toEqual(updateOn);
            });

            // feature : https://github.com/rxweb/rxweb/issues/402
            it("should set updateOn for nested properties, arrays and objects",
            () => {
                const updateOn: "change" | "blur" | "submit" = "blur";
                const formBuilderConfig: FormBuilderConfiguration = {
                    abstractControlOptions: {
                        "person1.address": updateOn,
                        "person1.skills": updateOn,
                        "person2.address.city": updateOn,
                    }
                };
                const person1: Person = {
                    address: new Address(),
                    skills: new Array<Skill>(),
                    name: "",
                };
                const person2: Person = {
                    address: new Address(),
                    skills: new Array<Skill>(),
                    name: "",
                };
                const personGroup: PersonGroup = { person1, person2};
                const formGroup = <RxFormGroup>formBuilder.formGroup(PersonGroup, personGroup, formBuilderConfig);
                expect((<RxFormGroup>formGroup.controls.person1).controls.address.updateOn).toEqual(updateOn);
                expect((<RxFormGroup>formGroup.controls.person1).controls.skills.updateOn).toEqual(updateOn);
                expect((<RxFormGroup>(<RxFormGroup>formGroup.controls.person2).controls.address).controls.city.updateOn).toEqual(updateOn);
            });
            //end
        });
    });
