import { Component, OnChanges, SimpleChanges, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApplicationBroadcaster } from "src/app/domain/application-broadcaster";
import { Router } from "@angular/router";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})

export class TopBarComponent implements OnInit {
  searchFormGroup: FormGroup
  showComponent: boolean = false;
  showSearchMenu:boolean =false;
  /*formValidators: any;*/
  url:string;
  constructor(private _formBuilder: FormBuilder,private http: HttpClient,private applicationBroadCaster:ApplicationBroadcaster,private router:Router
  ) {
    /*this.searchFormGroup = this._formBuilder.group({
      search: ''
    })*/
    applicationBroadCaster.urlSubscriber.subscribe(t => {
      this.url = t;
    });
  }

  ngOnInit(): void {
    /*this.http.get('assets/json/validation.json')
    .subscribe(response => {
      this.formValidators = response;
  	  this.showComponent = true;  
    }) ;*/
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