import { Component, OnInit, HostListener } from '@angular/core';
import { Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { RxFormBuilder } from "@rxweb/reactive-form-validators";
import { FeedbackModel } from "src/app/components/shared/right-sidebar/domain/feedback.model";
import { Http } from "@angular/http";
import { RequestOptionsArgs } from "@angular/http";
import { RequestOptions } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

@Component({
    selector: 'app-right-sidebar',
    templateUrl: './right-sidebar.component.html',
})

export class RightSideBarComponent implements OnInit {
    public feedbackForm: FormGroup
    sticky:boolean = false;
    validationName: string;
    mainType: string;
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    constructor(
        private http: HttpClient,private formBuilder: RxFormBuilder
    ) {
    }
    @Input('sidebarLinks') sidebarLinks: any = {};
    showComponent: boolean = false;
    contributorList: any = [];
    gitEditUrl: string = "https://github.com/rxweb/rxweb/edit/master/";
    @HostListener('window:scroll', ['$event'])
    handleScroll(){
        const windowScroll = document.documentElement.scrollTop;
            if(windowScroll >= 50){
                this.sticky = true;
            } else {
                this.sticky = false;
            }
    }
  
    ngOnInit(): void {
        var splitedArray = location.pathname.split("/");
        this.mainType = splitedArray[1];
        this.validationName = splitedArray[2];
        if(splitedArray.length > 0 && splitedArray[1])
        {
            switch(splitedArray[1])
            {
                case "decorators":
                    this.gitEditUrl += "docs/reactive-form-validators/decorators/" + splitedArray[2] + ".md"    
                    break;
                case "form-validations":
                    this.gitEditUrl += "docs/reactive-form-validators/validation-decorators/" + splitedArray[2] + ".md"    
                    break;
                case "api":
                    this.gitEditUrl += "docs/reactive-form-validators/api/ReactiveFormConfig.md"    
                    break;
                case "community":
                    this.gitEditUrl += "docs/community/" + splitedArray[2] + ".md"
                    break;
                case "getting-started":
                    this.gitEditUrl += "docs/reactive-form-validators/getting-started.md"    
                    break;
                case "sanitization":
                    this.gitEditUrl += "docs/reactive-form-validators/sanitization/" + splitedArray[2]+".md"    
                    break
                case "how-to":
                    this.gitEditUrl += "docs/reactive-form-validators/validation-advance-form/" + splitedArray[2]+".md"    
                    break
            }
        }
        else if(splitedArray.length > 0 && splitedArray[0]== "changelog"){
            this.gitEditUrl += "CHANGELOG.md"    
        }
        this.showComponent = true;
    }
    scrollTo(section) {
        var node = document.querySelector('#' + section);
        node.scrollIntoView(true);
        var scrolledY = window.scrollY;
        if (scrolledY) {
            window.scroll(0, scrolledY - 62);
        }
        return false;
    }
   
}
