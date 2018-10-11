import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaxNumberAddValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/maxNumber/add/max-number-add.component';
import { MaxNumberCompleteValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/maxNumber/complete/max-number-complete.component';
import { MaxNumberDynamicValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/maxNumber/dynamic/max-number-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TitleCasePipe } from "@angular/common";

@Component({
  templateUrl: './maxNumber.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class MaxNumberComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic MaxNumber Validation":null,"NumberConfig":["conditionalExpression","message","value"],"Complete MaxNumber Example":null,"Dynamic MaxNumber Example":null};
  tab_1:string = "conditionalExpressionmodel";
   tab_2:string = "messageModel";
   tab_3:string = "valueModel";
   tab_4:string = "completeexample";
   tab_5:string = "dynamicexample";
   
  constructor(
    private http: HttpClient   ,private titlecasePipe:TitleCasePipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/validators/maxNumber/maxnumber.json',this.options).subscribe((response:object) => {
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
