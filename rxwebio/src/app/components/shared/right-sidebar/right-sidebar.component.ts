import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-right-sidebar',
    templateUrl: './right-sidebar.component.html',
})

export class RightSideBarComponent implements OnInit {
    constructor(
        private http: HttpClient
    ) {
    }
    @Input('sidebarLinks') sidebarLinks: any={};
    showComponent: boolean = false;
    contributorList:any=[];
    gitEditUrl:string="https://github.com/rxweb/rxweb/blob/master/docs/reactive-form-validators/";
    ngOnInit(): void {

        if(location.pathname.includes("form-validation"))
        {
            this.gitEditUrl+="/validation-decorators/" + location.pathname.split('/')[2] +".md"
        }
        else
        {
            this.gitEditUrl+= location.pathname.split('/')[1] +".md"
        }
        //let url = 'https://api.github.com/repos/rxweb/rxweb/';
		//if (location.pathname.split('/')[1] && !location.pathname.split('/')[2])
        //    url += 'commits?path=docs/reactive-form-validators/'+location.pathname.split('/')[1]+".md"
        //if (location.pathname.split('/')[1] && location.pathname.split('/')[2])
         //   url += 'commits?path=docs/reactive-form-validators/'+location.pathname.split('/')[1]+'/' + location.pathname.split('/')[2] + ".md"
        //this.http.get(url).subscribe((response: any[]) => {
          //  const author = response.map(data => data.author);
            //author.forEach(element => {
              //  if(element)                
                //{
                   // let indexObj = this.contributorList.find(a=>a.id == element.id);
                    //if(!indexObj)
                      //  this.contributorList.push(element);
                //}
            //});
            this.showComponent = true;
        //})
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
