import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DisqusComponent } from "src/app/components/shared/disqus/disqus/disqus.component";


@Component({
  selector: 'app-import-modules',
  templateUrl: './import-modules.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class ImportModulesComponent implements OnInit {
  showComponent:boolean = false;
  moduleContent:string;
  constructor(
    private router: Router, private http: HttpClient
  ) {
  }


  ngOnInit(): void {
    this.moduleContent = `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 

import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import {AppComponent} from './app.component';

@NgModule({
  declarations:[AppComponent],
  imports:[ BrowserModule, 
	FormsModule,
	ReactiveFormsModule, 
	RxReactiveFormsModule
	] 
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }`
    this.showComponent = true;
  }
}
