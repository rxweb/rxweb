import { Component, OnChanges, SimpleChanges, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})

export class SideBarComponent implements OnInit {
  links: any;
  isSecondLevelCollapse : boolean = false;
  isthirdLevelCollapse : boolean = true;
  showComponent: boolean;
  constructor(
    private http: HttpClient,private router: Router
  ) {
  }
  ngOnInit(): void {
    this.http.get('assets/json/sidebar.json').subscribe((response: any) => {
      this.links = response.links;
      this.showComponent = true;
    });
  }
  navigateTo(link:any):void{
    if(link!=null && link.uri != null)
    {
      link.active = true;
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


  showSideBar(): void {
    const body = document.getElementsByTagName('body')[0];
    if (window.innerWidth < 769) {
      body.classList.toggle('show-sidebar');
    } else {
      body.classList.toggle('hide-sidebar');
    }
  }
}

