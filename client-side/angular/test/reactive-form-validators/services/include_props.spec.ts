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
          expect(userFormGroup.controls.id).toBeDefined();
          expect(userFormGroup.controls.userName).toBeUndefined();
          expect(userFormGroup.controls.party).toBeUndefined();
          expect(userFormGroup.controls.roles).toBeUndefined();
     })

      it('should pass, should be include only "id" and party object properties ', () => {
          let user = new User();
          user.party = new Party();
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.includeProps = ["id", "party"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id).toBeDefined();
          expect(userFormGroup.controls.userName).toBeUndefined();
          expect(userFormGroup.controls.party).toBeDefined();


          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id).toBeDefined();
          expect(partyFormGroup.controls.name).toBeDefined();
      })

      it('should pass, should be include only "id" and party object "id" property ', () => {
          let user = new User();
          user.party = new Party();
          user.party.user = user;
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.includeProps = ["id","party","party.id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id).toBeDefined();
          expect(userFormGroup.controls.userName).toBeUndefined();
          expect(userFormGroup.controls.party).toBeDefined();


          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id).toBeDefined();
          expect(partyFormGroup.controls.name).toBeUndefined();
          expect(partyFormGroup.controls.user).toBeUndefined();

          expect(userFormGroup.controls.roles).toBeUndefined();
      })

      it('should pass, should be include only "id", party object "id" and  nested user object "id" property ', () => {
          let user = new User();
          user.party = new Party();
          user.party.user = user;
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.includeProps = ["id", "party", "party.id","party.user","party.user.id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id).toBeDefined();
          expect(userFormGroup.controls.userName).toBeUndefined();
          expect(userFormGroup.controls.party).toBeDefined();


          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id).toBeDefined();
          expect(partyFormGroup.controls.name).toBeUndefined();
          expect(partyFormGroup.controls.user).toBeDefined();

          let nestedUserFormGroup = partyFormGroup.controls.user as FormGroup; 
          expect(nestedUserFormGroup.controls.id).toBeDefined();
          expect(nestedUserFormGroup.controls.userName).toBeUndefined();
          expect(nestedUserFormGroup.controls.party).toBeUndefined();

          expect(userFormGroup.controls.roles).toBeUndefined();
      })

      it('should pass, should be include only "id", party object "id" and  nested user object "id" property and nested formarray roles "id" property ', () => {
          let user = new User();
          user.party = new Party();
          user.roles = new Array<Role>();
          user.roles.push(new Role());
          user.roles.push(new Role());
          user.party.user = user;
          
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.includeProps = ["id", "party", "party.id", "party.user", "party.user.id","party.user.roles","party.user.roles.id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id).toBeDefined();
          expect(userFormGroup.controls.userName).toBeUndefined();
          expect(userFormGroup.controls.party).toBeDefined();
          expect(userFormGroup.controls.roles).toBeUndefined();

          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id).toBeDefined();
          expect(partyFormGroup.controls.name).toBeUndefined();
          expect(partyFormGroup.controls.user).toBeDefined();

          let nestedUserFormGroup = partyFormGroup.controls.user as FormGroup;
          expect(nestedUserFormGroup.controls.id).toBeDefined();
          expect(nestedUserFormGroup.controls.userName).toBeUndefined();
          expect(nestedUserFormGroup.controls.party).toBeUndefined();

          expect(nestedUserFormGroup.controls.roles).toBeDefined();
          let rolesFormArray = nestedUserFormGroup.controls.roles as FormArray;
          let roleFormGroup = rolesFormArray.controls[0] as FormGroup;
          let secondIndexRoleFormGroup = rolesFormArray.controls[1] as FormGroup;

          expect(roleFormGroup.controls.id).toBeDefined();
          expect(roleFormGroup.controls.name).toBeUndefined();

          expect(secondIndexRoleFormGroup.controls.id).toBeDefined();
          expect(secondIndexRoleFormGroup.controls.name).toBeUndefined();
      })

      it('should pass, one to many and many to many cases', () => {
          let user = new User();
          user.party = new Party();
          user.roles = new Array<Role>();
          let role = new Role();
          role.users = new Array<User>();
          role.users.push(new User());
          user.roles.push(role)
          user.party.user = user;
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.includeProps = ["id", "party", "party.id", "party.user", "party.user.id", "party.user.roles", "party.user.roles.id", "party.user.roles.users", "party.user.roles.users.id"];
          let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);

          expect(userFormGroup.controls.id).toBeDefined();
          expect(userFormGroup.controls.userName).toBeUndefined();
          expect(userFormGroup.controls.party).toBeDefined();
          expect(userFormGroup.controls.roles).toBeUndefined();

          let partyFormGroup = userFormGroup.controls.party as FormGroup;
          expect(partyFormGroup.controls.id).toBeDefined();
          expect(partyFormGroup.controls.name).toBeUndefined();
          expect(partyFormGroup.controls.user).toBeDefined();

          let nestedUserFormGroup = partyFormGroup.controls.user as FormGroup;
          expect(nestedUserFormGroup.controls.id).toBeDefined();
          expect(nestedUserFormGroup.controls.userName).toBeUndefined();
          expect(nestedUserFormGroup.controls.party).toBeUndefined();

          expect(nestedUserFormGroup.controls.roles).toBeDefined();
          let rolesFormArray = nestedUserFormGroup.controls.roles as FormArray;
          let roleFormGroup = rolesFormArray.controls[0] as FormGroup;

          expect(roleFormGroup.controls.id).toBeDefined();
          expect(roleFormGroup.controls.name).toBeUndefined();
          expect(roleFormGroup.controls.users).toBeDefined();
          
          let usersFormArray = roleFormGroup.controls.users as FormArray;
          let zeroIndexUserFormGroup = usersFormArray.controls[0] as FormGroup;
          expect(zeroIndexUserFormGroup.controls.id).toBeDefined();
          expect(zeroIndexUserFormGroup.controls.userName).toBeUndefined();
          expect(zeroIndexUserFormGroup.controls.party).toBeUndefined();

      })

      

})
