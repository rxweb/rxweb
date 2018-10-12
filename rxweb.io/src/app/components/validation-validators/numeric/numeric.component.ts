import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NumericCompleteValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/numeric/complete/numeric-complete.component';
import { NumericDynamicValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/numeric/dynamic/numeric-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TitleCasePipe } from "@angular/common";

@Component({
  templateUrl: './numeric.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class NumericComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic numeric Validation":null,"NumericConfig":["acceptValue","allowDecimal","conditionalExpression","message"],"Complete numeric Example":null,"Dynamic numeric Example":null};
  tab_1:string = "acceptValueComponent";
   tab_2:string = "allowDecimalComponent";
   tab_3:string = "conditionalExpressionComponent";
   tab_4:string = "messageComponent";
   tab_5:string = "completeexample";
   tab_6:string = "dynamicexample";
   
  constructor(
    private http: HttpClient   ,private titlecasePipe:TitleCasePipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/validators/numeric/numeric.json',this.options).subscribe((response:object) => {
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
