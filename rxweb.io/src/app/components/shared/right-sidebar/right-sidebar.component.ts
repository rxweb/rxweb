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
    sidebarItem: any = [];
    showComponent: boolean = false;
    contributorList:any;
    ngOnInit(): void {
        for (var key in this.sidebarLinks) {
            if (this.sidebarLinks.hasOwnProperty(key)) {
                var currentObject = {};
                currentObject['parentLink'] = key;
                currentObject['parentLinkId'] = key.toLowerCase().split(" ").join('');
                currentObject['childLink'] = [];
                if (this.sidebarLinks[key] != null) {
                    for (let i = 0; i < this.sidebarLinks[key].length; i++) {
                        currentObject['childLink'].push({ value: this.sidebarLinks[key][i], id: this.sidebarLinks[key][i].toLowerCase().split(" ").join('') })
                    }
                }
                this.sidebarItem.push(currentObject);
            }
        }
        this.http.get('https://api.github.com/repos/rxweb/rxweb/contributors').subscribe((response: any[]) => {
            this.contributorList = response;
            this.showComponent = true;
        })
        
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