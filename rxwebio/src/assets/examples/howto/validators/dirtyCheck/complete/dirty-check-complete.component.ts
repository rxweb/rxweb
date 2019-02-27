import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"

import { RxFormBuilder,FormBuilderConfiguration,FormGroupExtension } from '@rxweb/reactive-form-validators';


@Component({
    selector: 'app-dirty-complete-validator',
    templateUrl: './dirty-check-complete.component.html'
})
export class DirtyCompleteValidatorComponent implements OnInit {

   editForm:FormGroup;

  constructor(private formBuilder:RxFormBuilder){}
  
  ngOnInit(){

   this.editForm = this.formBuilder.group({
      id:[1],
      name: ["Bharat" ],
      designation: ["Software Engg."]
    });
   this.IsDirty();
  }
  IsDirty()
  {
    let isDirty = (<FormGroupExtension>this.editForm).isDirty();
  }
}
