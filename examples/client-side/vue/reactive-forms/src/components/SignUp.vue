<template>

    <div class="row">

        <div class="col-lg-12">
            <h1>User Registration</h1>
            <form>
                <div class="form-group">
                    <label>First Name</label>
                    <input id="name"
                           class="form-control"
                           v-model="userFormGroup.props.firstName"
                           type="text"
                           name="name">
                    <div>
                        <small class="form-text text-danger">
                            {{userFormGroup.controls.firstName.errorMessage}}
                            <br>
                        </small>
                    </div>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input id="name"
                           class="form-control"
                           v-model="userFormGroup.props.lastName"
                           type="text"
                           name="name">
                    <div>
                        <small class="form-text text-danger">
                            {{userFormGroup.controls.lastName.errorMessage}}
                            <br>
                        </small>
                    </div>
                </div>
                <div class="form-group">
                    <label>User Name</label>
                    <input id="name"
                           class="form-control"
                           v-model="userFormGroup.props.userName"
                           type="text"
                           name="name">
                    <div>
                        <small class="form-text text-danger">
                            {{userFormGroup.controls.userName.errorMessage}}
                            <br>
                        </small>
                    </div>
                </div>
                <div class="form-group">
                    <b>Full Name </b> {{userFormGroup.modelInstance.fullName}}<br />
                </div>
                <button class="btn btn-primary" :disabled="!userFormGroup.valid">Submit</button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { RxFormBuilder, IFormGroup } from "@rxweb/reactive-forms"
    import { User } from "../models/user"

    @Component
    export default class SignUp extends Vue {

        userFormGroup!: IFormGroup<User>;
        formBuilder: RxFormBuilder = new RxFormBuilder();

        constructor() {
            super();
            this.userFormGroup = this.formBuilder.formGroup(User) as IFormGroup<User>;
        }
    }
</script>


