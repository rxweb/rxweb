import { Component, OnChanges, SimpleChanges, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RangeAddValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/range/add/range-add.component';
import { RangeCompleteValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/range/complete/range-complete.component';
import { RangeDynamicValidatorComponent } from 'src/assets/examples/reactive-form-validators/validators/range/dynamic/range-dynamic.component';
import { DisqusComponent } from '../../shared/disqus/disqus.component';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { TitleCasePipe } from "@angular/common";

@Component({
  templateUrl: './range.component.html',
  entryComponents: [
DisqusComponent
  ]
})
export class RangeComponent implements OnInit {
  showComponent: boolean = false;
  options: any = { responseType: 'text' };
  codeContent:any = {};
  sidebarLinks:any = {"When to use":null,"Basic range Validation":null,"RangeConfig":["conditionalExpression","message","minimumNumber","maximumNumber"],"Complete range Example":null,"Dynamic range Example":null};
  tab_1:string = "conditionalExpressionmodel";
   tab_2:string = "messageModel";
   tab_3:string = "minimumNumberModel";
   tab_4:string = "maximumNumberModel";
   tab_5:string = "completeexample";
   tab_6:string = "dynamicexample";
   
  constructor(
    private http: HttpClient   ,private titlecasePipe:TitleCasePipe
  ) {
  }
  ngOnInit(): void {
	this.http.get('assets/examples/reactive-form-validators/validators/range/range.json',this.options).subscribe((response:object) => {
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
