import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { RxFormBuilder } from "@rxweb/reactive-form-validators";


@Component({
  templateUrl: './form-builder.component.html',
})
export class FormBuilderComponent implements OnInit {
  showComponent: boolean = false;
  formBuilderFormGroup:FormGroup
  constructor(
    private formBuilder: RxFormBuilder
  ) {
  }
  ngOnInit(): void {
      this.showComponent = true;
  }
}
