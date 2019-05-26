import {FormGroup, FormArray} from '@angular/forms';

import { RxFormBuilder, FormBuilderConfiguration, RxFormGroup,prop, propObject, propArray } from '@rxweb/reactive-form-validators';

import { User,Party,Role } from "./models"




 describe('include_props',()=>{
     let formBuilder = new RxFormBuilder();
     beforeEach(() => {});
      it('should pass, only "id" property should be available in userFormGroup',()=>{
          let user = new User();
          user.party = new Party();
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.includeProps = ["id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
          expect(userFormGroup.controls.id != undefined).toBe(true);
          expect(userFormGroup.controls.userName).toBe(undefined);
          expect(userFormGroup.controls.party).toBe(undefined);
          expect(userFormGroup.controls.roles).toBe(undefined);
     })

      it('should pass, should be include only "id" and party object "id" property ', () => {
          let user = new User();
          user.party = new Party();
          user.party.user = user;
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.includeProps = ["id","party","party.id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id != undefined).toBe(true);
          expect(userFormGroup.controls.userName).toBe(undefined);
          expect(userFormGroup.controls.party != undefined).toBe(true);


          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id != undefined).toBe(true);
          expect(partyFormGroup.controls.name).toBe(undefined);
          expect(partyFormGroup.controls.user).toBe(undefined);

          expect(userFormGroup.controls.roles).toBe(undefined);
      })

      it('should pass, should be include only "id", party object "id" and  nested user object "id" property ', () => {
          let user = new User();
          user.party = new Party();
          user.party.user = user;
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.includeProps = ["id", "party", "party.id","party.user","party.user.id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id != undefined).toBe(true);
          expect(userFormGroup.controls.userName).toBe(undefined);
          expect(userFormGroup.controls.party != undefined).toBe(true);


          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id != undefined).toBe(true);
          expect(partyFormGroup.controls.name).toBe(undefined);
          expect(partyFormGroup.controls.user != undefined).toBe(true);

          let nestedUserFormGroup = partyFormGroup.controls.user as FormGroup; 
          expect(nestedUserFormGroup.controls.id != undefined).toBe(true);
          expect(nestedUserFormGroup.controls.userName).toBe(undefined);
          expect(nestedUserFormGroup.controls.party).toBe(undefined);

          expect(userFormGroup.controls.roles).toBe(undefined);
      })

      it('should pass, should be include only "id", party object "id" and  nested user object "id" property and nested formarray roles "id" property ', () => {
          let user = new User();
          user.party = new Party();
          user.roles = new Array<Role>();
          user.roles.push(new Role());
          user.party.user = user;
          
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.includeProps = ["id", "party", "party.id", "party.user", "party.user.id","party.user.roles","party.user.roles.id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id != undefined).toBe(true);
          expect(userFormGroup.controls.userName).toBe(undefined);
          expect(userFormGroup.controls.party != undefined).toBe(true);
          expect(userFormGroup.controls.roles).toBe(undefined);

          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id != undefined).toBe(true);
          expect(partyFormGroup.controls.name).toBe(undefined);
          expect(partyFormGroup.controls.user != undefined).toBe(true);

          let nestedUserFormGroup = partyFormGroup.controls.user as FormGroup;
          expect(nestedUserFormGroup.controls.id != undefined).toBe(true);
          expect(nestedUserFormGroup.controls.userName).toBe(undefined);
          expect(nestedUserFormGroup.controls.party).toBe(undefined);

          expect(nestedUserFormGroup.controls.roles != undefined).toBe(true);
          let rolesFormArray = nestedUserFormGroup.controls.roles as FormArray;
          let roleFormGroup = rolesFormArray.controls[0] as FormGroup;

          expect(roleFormGroup.controls.id != undefined).toBe(true);
          expect(roleFormGroup.controls.name).toBe(undefined);
      })

      

})
