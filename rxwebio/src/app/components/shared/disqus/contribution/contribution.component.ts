import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Location } from '@angular/common';
import * as moment from 'src/assets/scripts/moment.js'
import * as showdown from 'src/assets/scripts/showdown.js'

@Component({
    selector: 'app-contribution',
    templateUrl: './contribution.component.html',
})

export class ContributionComponent implements OnInit{
    constructor(
    ) {
    }
    gitEditUrl: string = "https://github.com/rxweb/rxweb/edit/master/docs/reactive-form-validators";
    pageName:string;
    ngOnInit(){
        var splitedArray = location.pathname.split("/");
        if(splitedArray.length > 0 && splitedArray[1])
        {
            switch(splitedArray[1])
            {
                case "decorators":
                    this.gitEditUrl += "/decorators/" + splitedArray[2] + ".md"    
                    this.pageName = splitedArray[2]
                    break;
                case "form-validations":
                    this.gitEditUrl += "/validation-decorators/" + splitedArray[2] + ".md"    
                    this.pageName = splitedArray[2]
                    break;
                case "api":
                    this.gitEditUrl += "/api/ReactiveFormConfig.md"    
                    this.pageName = "ReactiveFormConfig"
                    break;
                case "getting-started":
                    this.gitEditUrl += "/getting-started.md"    
                    this.pageName = "Getting Started"
                    break;
            }
        }
    }
}