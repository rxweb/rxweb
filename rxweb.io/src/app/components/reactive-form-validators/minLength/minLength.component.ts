import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MinLengthCompleteComponent } from '../../../../assets/examples/minLength/complete/min-length-complete.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { ResponseType } from '@angular/http';

@Component({
  templateUrl: './minLength.component.html',
  entryComponents: [
  	MinLengthCompleteComponent,
   DisqusComponent
  ]
})
export class MinLengthComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {}
  	tab_1:string = "conditionalExpressionsmodel";
   	tab_2:string = "messageModel";
   	tab_3:string = "valueModel";
   	tab_4:string = "completeexample";
   
  constructor(
    private http: HttpClient
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/minLength/minlength.json',this.options).subscribe((response:object) => {
      this.codeContent = JSON.parse(response.toString());
	  this.showComponent = true;
    })
  }
}
