import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AlphanumericCompleteComponent } from '../../../../assets/examples/alphaNumeric/complete/alpha-numeric-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { ResponseType } from '@angular/http';

@Component({
  templateUrl: './alphaNumeric.component.html',
  entryComponents: [
  	AlphanumericCompleteComponent,
   DisqusComponent
  ]
})
export class AlphaNumericComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {}
  	tab_1:string = "basicadd";
   	tab_2:string = "allowWhiteSpacemodel";
   	tab_3:string = "conditionalExpressionsmodel";
   	tab_4:string = "messageModel";
   	tab_5:string = "completeexample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/alphaNumeric/alphaNumeric.json',this.options).subscribe((response:object) => {
      this.codeContent = JSON.parse(response.toString());
	  this.showComponent = true;
    })
  }
}
