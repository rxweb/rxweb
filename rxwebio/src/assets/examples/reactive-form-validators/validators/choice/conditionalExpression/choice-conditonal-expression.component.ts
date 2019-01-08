import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-choice-conditionalExpression-validator',
    templateUrl: './choice-conditional-expression.component.html'
})
export class ChoiceConditionalExpressionValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder, private http: HttpClient) { }

    qualificationsArray: string[] = [];
    skillsArray: string[] = [];

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
            department:[''],
            qualifications:['',RxwebValidators.choice({minLength:3, conditionalExpression: (x,y) => x.department =='DotNet'})],
            skills:['',RxwebValidators.choice({maxLength:4, conditionalExpression: "x => x.department =='DotNet'"})]
            
        });
        this.http.get("assets/examples/reactive-form-validators/validators/choice/conditionalExpression/choice.json").subscribe(response => {
            this.qualificationsArray = response['qualificationsArray'];
            this.skillsArray = response['skillsArray'];
        })
    }

    index = 0;
    addQualification(element:any) {
        var value = this.employeeInfoFormGroup.controls.qualifications.value;
        if(!value)
          value = [];
          if(element.checked) {
                value.push(element.value);
                this.index++;
          }
          else
          {
          var indexOf = value.indexOf(element.value);
          value.splice(indexOf,1);
          }
        this.employeeInfoFormGroup.controls.qualifications.setValue(value)
      }

      addSkill(element:any) {
        var value = this.employeeInfoFormGroup.controls.skills.value;
        if(!value)
          value = [];
          if(element.checked) {
                value.push(element.value);
                this.index++;
          }
          else
          {
          var indexOf = value.indexOf(element.value);
          value.splice(indexOf,1);
          }
        this.employeeInfoFormGroup.controls.skills.setValue(value)
      }

}
