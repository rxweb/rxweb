import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl } from "@angular/forms"
import { User } from './models/user';
import { Address } from './models/address';
import { Skill } from './models/skill';
import { IFormBuilder,IFormGroup,IFormArray} from "@rxweb/types"
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    formGroup: IFormGroup<User>;
    formBuilder: IFormBuilder;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group<User>({
            firstName: ['', [Validators.required]],
            address: this.formBuilder.group<Address>({
                countryName: ["", Validators.required]
            }),
            skills: this.formBuilder.array<Skill>([
                this.formBuilder.group({
                    name: ["", Validators.required]
                })
            ])
        });
        

        this.formGroup.addControl("lastName", new FormControl("abc"));

        this.formGroup.patchValue({ lastName: 'Gates' })

        this.formGroup.registerControl("lastName", new FormControl("Gates"))

        this.formGroup.removeControl("lastName")

        this.formGroup.reset({ lastName: 'Gates' });

        this.formGroup.setControl("lastName", new FormControl("abc"));

        this.formGroup.setValue({ lastName: 'Gates' });

        this.formGroup.get("lastName");

        this.formGroup.getError("lastName");

        let userFormGroupValue: Address = this.formGroup.value;


        this.formGroup.contains("fakeControl")

        let user: Address = this.formGroup.getRawValue()



        //FormControl


        this.formGroup.controls.fakeControl;
                          

        this.formGroup.controls.firstName.valueChanges.subscribe(value => {
            let fakeValue: Date = value;
        })


        this.formGroup.controls.firstName.statusChanges.subscribe(status => {
            if (status == "Fake") {

            }
        })

        let controlValue: Date = this.formGroup.controls.firstName.value;


        this.formGroup.controls.firstName.setValue(new Date())

        this.formGroup.controls.firstName.patchValue(new Date())

        this.formGroup.controls.firstName.reset(new Date())

        

        //Nested FormGroup
        
        let addressFormGroup = this.formGroup.controls.address as IFormGroup<Address>;
        addressFormGroup.controls.countryName.setValue(new Date());





        //Nested FormArray
        let skillFormArray = this.formGroup.controls.skills as IFormArray<Skill>;

        let rawValue: Address[] = skillFormArray.getRawValue();


        skillFormArray.insert(0, this.formBuilder.group<Address>({ countryName: [''] }));


        skillFormArray.push(this.formBuilder.group<Address>({ countryName: [''] }))

        skillFormArray.setControl(0, this.formBuilder.group<Address>({ countryName: [''] }))

        let formArrayValue: Address[] = skillFormArray.value;

        skillFormArray.valueChanges.subscribe(skills => {
            let values: Address[] = skills;
        })

        skillFormArray.reset([{
            name: new Date()
        }]);
        

    }
}
