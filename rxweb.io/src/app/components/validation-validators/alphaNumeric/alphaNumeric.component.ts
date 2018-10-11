import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AlphaNumericAddValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/alphaNumeric/add/alpha-numeric-add.component';
import { AlphaNumericCompleteValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/alphaNumeric/complete/alpha-numeric-complete.component';
import { AlphaNumericDynamicValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/alphaNumeric/dynamic/alpha-numeric-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TitleCasePipe } from "@angular/common";

@Component({
  templateUrl: './alphaNumeric.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class AlphaNumericComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic AlphaNumeric Validation":null,"AlphaConfig":["allowWhiteSpace","conditionalExpression","message"],"Complete AlphaNumeric Example":null,"Dynamic AlphaNumeric Example":null};
  tab_1:string = "allowWhiteSpacemodel";
   tab_2:string = "conditionalExpressionmodel";
   tab_3:string = "messageModel";
   tab_4:string = "completeexample";
   tab_5:string = "dynamicexample";
   
  constructor(
    private http: HttpClient   ,private titlecasePipe:TitleCasePipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/validators/alphaNumeric/alphanumeric.json',this.options).subscribe((response:object) => {
      this.codeContent = JSON.parse(response.toString());
	  let splitedArray = location.pathname.split('/');
	  if(splitedArray[2] != undefined)
		document.title = this.titlecasePipe.transform(splitedArray[2]) + " : " + this.titlecasePipe.transform(splitedArray[1])
	  else
		document.title = splitedArray[1] ? this.titlecasePipe.transform(splitedArray[1]) : "RxApp"
	  this.showComponent = true;
    })
  }
  scrollTo(section) {  
    var node = document.querySelector(section);
    node.scrollIntoView(true);
    var scrolledY = window.scrollY;
    if(scrolledY){
      window.scroll(0, scrolledY - 62);
    }
	return false;
  }
}
