import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';
import { HttpClient, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Http } from "@angular/http";


@Component({
  templateUrl: './reactive-form-config.component.html',
})

export class ReactiveFormConfigComponent implements OnInit {
    showComponent:boolean = false;
    codeContent:any;
    rightSidebarLinks:any=[{"id":"reactive-form-config","title":"ReactiveFormConfig","subLink":null},{"id":"about-reactiveformconfig","title":"About ReactiveFormConfig","subLink":[{"title":"baseConfig","id":"baseConfig"},{"title":"internationalization","id":"internationalization"},{"title":"Validation Messages","id":"validationMessage"}]}];
    sticky: boolean = false;
    constructor(private http: Http
        ) {
        }
    ngOnInit(): void {
        this.http.get('assets/json/generator/reactiveFormConfig/reactiveFormConfig.json').subscribe(response => {
            this.codeContent = response.json();
        this.showComponent = true;
    });
   }

   @HostListener('window:scroll', ['$event'])
   handleScroll(){
     const windowScroll = document.documentElement.scrollTop;
         if(windowScroll >= 50){
             this.sticky = true;
         } else {
             this.sticky = false;
         }
   }
   
    scrollTo(section) {
        location.hash = section;
        return false;
    }
}