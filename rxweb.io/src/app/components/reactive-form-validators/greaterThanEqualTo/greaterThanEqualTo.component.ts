import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GreaterthanequaltoCompleteComponent } from '../../../../assets/examples/greaterThanEqualTo/complete/greater-than-equal-to-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { ResponseType } from '@angular/http';

@Component({
  templateUrl: './greaterThanEqualTo.component.html',
  entryComponents: [
  	GreaterthanequaltoCompleteComponent,
   DisqusComponent
  ]
})
export class GreaterThanEqualToComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {}
  	tab_1:string = "basicadd";
   	tab_2:string = "fieldNamemodel";
   	tab_3:string = "conditionalExpressionsmodel";
   	tab_4:string = "messageModel";
   	tab_5:string = "completeexample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/greaterThanEqualTo/greaterThanEqualTo.json',this.options).subscribe((response:object) => {
      this.codeContent = JSON.parse(response.toString());
	  this.showComponent = true;
    })
  }
}
