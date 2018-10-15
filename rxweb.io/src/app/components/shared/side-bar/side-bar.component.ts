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
  isSecondLevelCollapse : boolean = false;
  isthirdLevelCollapse : boolean = false;
  showComponent: boolean;
  constructor(
    private http: HttpClient,private router: Router,private applicationBroadCaster:ApplicationBroadcaster
  ) {
  }
  ngOnInit(): void {
    this.http.get('assets/json/sidebar.json').subscribe((response: any) => {
      this.links = response.links;
      this.showComponent = true;
    });
  }
  navigateTo(urlObj:string):void{
    if(urlObj!=null)
    {
      var url = "https://github.com/rxweb/rxweb/blob/master/docs/reactive-form-validators/" +urlObj + ".md"
      this.applicationBroadCaster.urlBroadCast(url);
      this.router.navigateByUrl(urlObj);
    }
  }
}

