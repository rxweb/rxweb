import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
@Component({
    selector: 'app-choice-dynamic-validator',
    templateUrl: './choice-dynamic.component.html'
})
export class ChoiceDynamicValidatorComponent implements OnInit {

    employeeInfoFormGroup: FormGroup

    selectedQualifications: string[] = [];
    selectedSkills: string[] = [];
    selectedHobbies: string[] = [];
    projectDomains : string[] = [];

	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

	qualificationsArray: string[] = [];
	skillsArray: string[] = [];
	hobbiesArray: string[] = [];
	projectDomainsArray : string[] = [];

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/choice/dynamic/dynamic.json?v='+environment.appVersion).subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var employeeInfo = { department:'', projectDomains:'', skills:'', hobbies:'' ,qualifications:'' }
			this.employeeInfoFormGroup = this.formBuilder.group(employeeInfo,formBuilderConfiguration);
		})

		this.http.get("assets/examples/reactive-form-validators/validators/choice/dynamic/choice.json?v="+environment.appVersion).subscribe(response => {
            this.skillsArray = response['skillsArray'];
            this.hobbiesArray = response['hobbiesArray'];
            this.projectDomainsArray = response['projectDomainsArray'];
            this.qualificationsArray = response['qualificationsArray']
        })
    }
    
    index = 0;
    addProjectDomain(element:any) {
      var value = this.employeeInfoFormGroup.controls.projectDomains.value;
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
      this.employeeInfoFormGroup.controls.projectDomains.setValue(value)
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

      addHobby(element:any) {
        var value = this.employeeInfoFormGroup.controls.hobbies.value;
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
        this.employeeInfoFormGroup.controls.hobbies.setValue(value)
      }


     
}
