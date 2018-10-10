import { Component, OnChanges, SimpleChanges, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})

export class TopBarComponent implements OnInit {
  searchFormGroup: FormGroup
  showComponent: boolean = false;
  showSearchMenu:boolean =false;
  FormValidators: any;
  constructor(private _formBuilder: FormBuilder,private http: HttpClient
  ) {
    this.searchFormGroup = this._formBuilder.group({
      search: ''
    })
  }

  ngOnInit(): void {
    this.http.get('assets/json/validation.json')
    .subscribe(response => {
      this.FormValidators = response;
    }) ;
  this.showComponent = true;
  }

  hideSideBar(): void {
    const body = document.getElementsByTagName('body')[0];
    if (window.innerWidth < 769) {
      body.classList.toggle('show-sidebar');
    } else {
      body.classList.toggle('hide-sidebar');
    }
  }
}
