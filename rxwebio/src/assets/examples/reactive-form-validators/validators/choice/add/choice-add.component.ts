import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-choice-add-validator',
    templateUrl: './choice-add.component.html'
})
export class ChoiceAddValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup
    showComponent:boolean=false;

    projectDomains: string[] = [];

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

    projectDomainsArray: string[] = [];

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
            department: [''],
            projectDomains: ['', RxwebValidators.choice({ minLength: 3 })],
        });
        this.http.get("assets/examples/reactive-form-validators/validators/choice/add/choice.json?v="+environment.appVersion).subscribe(response => {
            this.projectDomainsArray = response['projectDomainsArray'];
            this.showComponent = true;
        })
    }

    index = 0;
    addProjectDomain(element: any) {
        var value = this.employeeInfoFormGroup.controls.projectDomains.value;
        if (!value)
            value = [];
        if (element.checked) {
            value.push(element.value);
            this.index++;
        }
        else {
            var indexOf = value.indexOf(element.value);
            value.splice(indexOf, 1);
        }
        this.employeeInfoFormGroup.controls.projectDomains.setValue(value)
    }
}
