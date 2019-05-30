import {FormGroup, FormArray} from '@angular/forms';

import { RxFormBuilder, FormBuilderConfiguration, RxFormGroup,prop, propObject, propArray } from '@rxweb/reactive-form-validators';

import { User,Party,Role } from "./models"




 describe('exclude_props',()=>{
     let formBuilder = new RxFormBuilder();
     beforeEach(() => {});
      it('should pass, only "id" property should not be available in userFormGroup',()=>{
          let user = new User();
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.excludeProps = ["id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
          expect(userFormGroup.controls.id).toBeUndefined();
          expect(userFormGroup.controls.userName).toBeDefined();
          expect(userFormGroup.controls.party).toBeUndefined();
          expect(userFormGroup.controls.roles).toBeUndefined();
     })

      it('should pass, should be exclude only "id" and party object properties ', () => {
          let user = new User();
          user.party = new Party();
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.excludeProps = ["id", "party"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id).toBeUndefined();
          expect(userFormGroup.controls.userName).toBeDefined();
          expect(userFormGroup.controls.party).toBeUndefined();
      })

      it('should pass, should be exclude only "id" and party object "id" property ', () => {
          let user = new User();
          user.party = new Party();
          user.party.user = new User();
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.excludeProps = ["id", "party.id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id).toBeUndefined();
          expect(userFormGroup.controls.userName).toBeDefined();
          expect(userFormGroup.controls.party).toBeDefined();


          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id).toBeUndefined();
          expect(partyFormGroup.controls.name).toBeDefined();
          expect(partyFormGroup.controls.user).toBeDefined();

          expect(userFormGroup.controls.roles).toBeUndefined();
      })


})
