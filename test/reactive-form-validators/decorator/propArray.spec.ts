import { FormGroup, FormArray } from '@angular/forms';

import { prop, required, propArray, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '../../../packages/reactive-form-validators';

export class Skill {
    @prop()
    name: string;
}
export class Person {

    @propArray(Skill)
    skills: Skill[];

    @required()
    name: string;
}


describe('prop-array', () => {
    let formBuilder = new RxFormBuilder();

    describe('prop-array-function-spec', () => {
        it('should not error, create group function object based on propArray',
            () => {
                var formBuilderConfig = new FormBuilderConfiguration();
                formBuilderConfig.autoInstanceConfig = {
                    arrayPropInstanceConfig: [{
                        propertyName: 'skills',
                        rowItems: 10
                    }]
                }
                let formGroup = <RxFormGroup>formBuilder.formGroup(Person, formBuilderConfig);
                expect(formGroup.modelInstance.constructor).toEqual(Person);
                expect(formGroup.modelInstance.skills[0].constructor).toEqual(Skill);
                expect(formGroup.modelInstance.skills.length).toEqual(10);


                let skillGroup = <FormGroup>formGroup.controls.skills['controls'][0];
                expect(skillGroup.controls.name.value).toBeNull();

                let skillFormGroup = formBuilder.group({
                    skillname: ['Development']

                })
                expect(skillFormGroup.controls.skillname.value).toEqual('Development');
            });
        it('should not error, add new element to a form with propArray', () => {
            let person = new Person();
            person.skills = new Array<Skill>();
            let skill = new Skill();
            person.skills.push(skill)
            let userFormGroup = formBuilder.formGroup(person);

            let skillFormGroup = userFormGroup.controls.skills as FormArray;
            expect(skillFormGroup.push(formBuilder.formGroup(Skill)));
        })
    });
})
