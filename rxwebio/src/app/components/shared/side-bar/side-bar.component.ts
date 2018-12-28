import { Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { ApplicationBroadcaster } from "src/app/domain/application-broadcaster";
import { AuthService } from 'src/app/domain/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})

export class SideBarComponent implements OnInit {
  links: any;
  isSecondLevelCollapse: boolean = false;
  isthirdLevelCollapse: boolean = true;
  showComponent: boolean;
  userProfile:any;
  constructor(
    private http: HttpClient, private router: Router, private applicationBroadcaster: ApplicationBroadcaster,private authService:AuthService
  ) {
  }
  ngOnInit(): void {
    this.http.get('assets/json/sidebar.json').subscribe((response: any) => {
      this.userProfile = localStorage.getItem("profile") != undefined ? JSON.parse(localStorage.getItem("profile")) : null;
      this.links = response.links;
      var splitedArray = location.pathname.split('#')[0].split('/')
      if (splitedArray[1]) {
        var currentArray = this.links.filter(a => a.otherUri == splitedArray[1]);
        if (currentArray && currentArray.length > 0) {
          currentArray[0].isActive = true;
          currentArray[0].isOpen = true;
          if (splitedArray[2]) {
            if (currentArray[0].childrens && currentArray[0].childrens.length > 0) {
              var currentObj = currentArray[0].childrens.filter(a => a.title == splitedArray[2]);
              if (currentObj && currentObj.length > 0) {
                currentObj[0].isActive = true;
                currentObj[0].isOpen = true;
              }
            }
          }
        }
        else {
          var children = this.links[1]['childrens'];
          var currentArray = children.filter(a => a.uri == splitedArray[1]);
          if (currentArray && currentArray.length > 0) {
            currentArray[0].isActive = true;
            currentArray[0].isOpen = true;
            if (splitedArray[2]) {
              if (currentArray[0].childrens && currentArray[0].childrens.length > 0) {
                var currentObj = currentArray[0].childrens.filter(a => a.title == splitedArray[2]);
                if (currentObj && currentObj.length > 0) {
                  currentObj[0].isActive = true;
                  currentObj[0].isOpen = true;
                }
              }
            }
          }
        }
      }
      this.showComponent = true;
    });
  }
  navigateTo(link: any, secondlevel: any, thirdlevel: any): void {
    if (link != null && link.uri != null) {
      this.links.forEach(element => {
        element.isActive = false;
        element.isOpen = false;
        if (element.childrens && element.childrens.length > 0) {
          element.childrens.forEach(subElement => {
            subElement.isActive = false;
            subElement.isOpen = false;
            if (subElement.childrens && subElement.childrens.length > 0) {
              subElement.childrens.forEach(thirdElement => {
                thirdElement.isActive = false;
                thirdElement.isOpen = false;
              });
            }
          })
        }
      });
      if (secondlevel != null) {
        secondlevel.isActive = true;
        secondlevel.isOpen = true;
      }
      if (thirdlevel != null) {
        thirdlevel.isActive = true;
        thirdlevel.isOpen = true;
      }
      link.isActive = true;
      this.router.navigateByUrl(link.uri);
    }
  }
  logOut():void{
    this.authService.logout()
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

