import { Component, OnInit } from '@angular/core';
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
    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    constructor(
        private http: HttpClient,private formBuilder: RxFormBuilder
    ) {
    }
    @Input('sidebarLinks') sidebarLinks: any = {};
    showComponent: boolean = false;
    contributorList: any = [];
    gitEditUrl: string = "https://github.com/rxweb/rxweb/edit/master/docs/reactive-form-validators";
    ngOnInit(): void {
        var splitedArray = location.pathname.split("/");
        if(splitedArray.length > 0 && splitedArray[1])
        {
            switch(splitedArray[1])
            {
                case "decorators":
                    this.gitEditUrl += "/decorators/" + splitedArray[2] + ".md"    
                    break;
                case "form-validations":
                    this.gitEditUrl += "/validation-decorators/" + splitedArray[2] + ".md"    
                    break;
                case "api":
                    this.gitEditUrl += "/api/ReactiveFormConfig.md"    
                    break;
                case "getting-started":
                    this.gitEditUrl += "/getting-started.md"    
                    break;
            }
        }
        this.showComponent = true;
    }
    scrollTo(section) {
        window.location.hash = section;
        return false;
    }
   
}
