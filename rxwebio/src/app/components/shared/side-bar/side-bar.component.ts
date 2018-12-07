import { Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ApplicationBroadcaster } from "src/app/domain/application-broadcaster";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})

export class SideBarComponent implements OnInit {
  links: any;
  isSecondLevelCollapse: boolean = false;
  isthirdLevelCollapse: boolean = true;
  showComponent: boolean;
  constructor(
    private http: HttpClient, private router: Router, private applicationBroadcaster: ApplicationBroadcaster
  ) {
  }
  ngOnInit(): void {
    this.http.get('assets/json/sidebar.json').subscribe((response: any) => {
      debugger;
      this.links = response.links;
      var splitedArray = location.pathname.split('#')[0].split('/')
      if(splitedArray[1]){
        var currentArray = this.links.filter(a=>a.otherUri == splitedArray[1]);
        if(currentArray && currentArray.length > 0){
          currentArray[0].isActive = true;
          if(splitedArray[2]){
            if(currentArray[0].childrens && currentArray[0].childrens.length > 0)
            {
              var currentObj = currentArray[0].childrens.filter(a=>a.title == splitedArray[2]);
              currentObj[0].isActive = true;
            }
          }
        }
        else
        {
          var children = this.links[1]['childrens']; 
          var currentArray = children.filter(a=>a.uri == splitedArray[1]);
          if(currentArray && currentArray.length > 0){
            currentArray[0].isActive = true;
            if(splitedArray[2]){
              if(currentArray[0].childrens && currentArray[0].childrens.length > 0)
              {
                var currentObj = currentArray[0].childrens.filter(a=>a.title == splitedArray[2]);
                currentObj[0].isActive = true;
              }
            }
          }
        }
      }
      this.showComponent = true;
    });
  }
  navigateTo(link: any): void {

    if (link != null && link.uri != null) {
      this.links.forEach(element => {
        element.isActive = false;
        if (element.childrens && element.childrens.length > 0) {
          element.childrens.forEach(subElement => {
            subElement.isActive = false;
            if (subElement.childrens && subElement.childrens.length > 0) {
            subElement.childrens.forEach(thirdElement => {
              thirdElement.isActive = false;
            });
            }
          })
        }
      });
      link.isActive = true;
      this.router.navigateByUrl(link.uri);
    }
  }

  hideSideBar(): void {
    const body = document.getElementsByTagName('body')[0];
    if (window.innerWidth < 769) {
      body.classList.toggle('show-sidebar');
    } else {
      body.classList.toggle('hide-sidebar');
    }
  }
}

