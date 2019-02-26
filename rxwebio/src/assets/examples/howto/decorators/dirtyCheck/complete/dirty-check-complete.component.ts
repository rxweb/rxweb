import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"

import { RxFormBuilder,FormBuilderConfiguration,FormGroupExtension } from '@rxweb/reactive-form-validators';
import {User} from './user.model'

@Component({
    selector: 'app-dirty-check-complete',
    templateUrl: './dirty-check-complete.component.html'
})
export class DirtyCheckCompleteComponent implements OnInit {

   editForm:FormGroup;

  constructor(private formBuilder:RxFormBuilder){}
  
  ngOnInit(){
   let user = new User();
   this.editForm = this.formBuilder.formGroup(user);
   this.IsDirty();
  }
  IsDirty()
  {
    let isDirty = (<FormGroupExtension>this.editForm).isDirty();
    
  }
}
