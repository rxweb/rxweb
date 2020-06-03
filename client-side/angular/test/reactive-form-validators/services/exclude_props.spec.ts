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


      it('should pass, should be exclude only "id", party object "id" and  nested user object "id" property ', () => {
          let user = new User();
          user.party = new Party();
          user.party.user = new User();
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.excludeProps = ["id", "party.id", "party.user.id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id).toBeUndefined();
          expect(userFormGroup.controls.userName).toBeDefined();
          expect(userFormGroup.controls.party).toBeDefined();


          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id).toBeUndefined();
          expect(partyFormGroup.controls.name).toBeDefined();
          expect(partyFormGroup.controls.user).toBeDefined();

          let nestedUserFormGroup = partyFormGroup.controls.user as FormGroup;
          expect(nestedUserFormGroup.controls.id).toBeUndefined();
          expect(nestedUserFormGroup.controls.userName).toBeDefined();
          expect(nestedUserFormGroup.controls.party).toBeUndefined();

          expect(userFormGroup.controls.roles).toBeUndefined();
      })


      it('should pass, should be exclude only "id", party object "id" and  nested user object "id" property and nested formarray roles "id" property ', () => {
          let user = new User();
          user.party = new Party();
          user.party.user = new User();
          user.party.user.roles = new Array<Role>();
          user.party.user.roles.push(new Role());
          user.party.user.roles.push(new Role());
          

          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.excludeProps = ["id", "party.id", "party.user.id", "party.user.roles.id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id).toBeUndefined();
          expect(userFormGroup.controls.userName).toBeDefined();
          expect(userFormGroup.controls.party).toBeDefined();
          expect(userFormGroup.controls.roles).toBeUndefined();

          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id).toBeUndefined();
          expect(partyFormGroup.controls.name).toBeDefined();
          expect(partyFormGroup.controls.user).toBeDefined();

          let nestedUserFormGroup = partyFormGroup.controls.user as FormGroup;
          expect(nestedUserFormGroup.controls.id).toBeUndefined();
          expect(nestedUserFormGroup.controls.userName).toBeDefined();
          expect(nestedUserFormGroup.controls.party).toBeUndefined();

          expect(nestedUserFormGroup.controls.roles).toBeDefined();
          let rolesFormArray = nestedUserFormGroup.controls.roles as FormArray;
          let roleFormGroup = rolesFormArray.controls[0] as FormGroup;
          let secondIndexRoleFormGroup = rolesFormArray.controls[1] as FormGroup;

          expect(roleFormGroup.controls.id).toBeUndefined();
          expect(roleFormGroup.controls.name).toBeDefined();

          expect(secondIndexRoleFormGroup.controls.id).toBeUndefined();
          expect(secondIndexRoleFormGroup.controls.name).toBeDefined();
      })


      it('should pass, one to many and many to many cases', () => {
          let user = new User();
          user.party = new Party();
          user.party.user = new User();
          user.party.user.roles = new Array<Role>();
          let role = new Role();
          role.users = new Array<User>();
          role.users.push(new User());
          user.party.user.roles.push(role)
          
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.excludeProps = ["id", "party.id", "party.user.id", "party.user.roles.id", "party.user.roles.users.id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id).toBeUndefined();
          expect(userFormGroup.controls.userName).toBeDefined();
          expect(userFormGroup.controls.party).toBeDefined();
          expect(userFormGroup.controls.roles).toBeUndefined();

          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id).toBeUndefined();
          expect(partyFormGroup.controls.name).toBeDefined();
          expect(partyFormGroup.controls.user).toBeDefined();

          let nestedUserFormGroup = partyFormGroup.controls.user as FormGroup;
          expect(nestedUserFormGroup.controls.id).toBeUndefined();
          expect(nestedUserFormGroup.controls.userName).toBeDefined();
          expect(nestedUserFormGroup.controls.party).toBeUndefined();

          expect(nestedUserFormGroup.controls.roles).toBeDefined();
          let rolesFormArray = nestedUserFormGroup.controls.roles as FormArray;
          let roleFormGroup = rolesFormArray.controls[0] as FormGroup;

          expect(roleFormGroup.controls.id).toBeUndefined();
          expect(roleFormGroup.controls.name).toBeDefined();
          expect(roleFormGroup.controls.users).toBeDefined();

          let usersFormArray = roleFormGroup.controls.users as FormArray;
          let zeroIndexUserFormGroup = usersFormArray.controls[0] as FormGroup;
          expect(zeroIndexUserFormGroup.controls.id).toBeUndefined();
          expect(zeroIndexUserFormGroup.controls.userName).toBeDefined();
          expect(zeroIndexUserFormGroup.controls.party).toBeUndefined();

      })

})
