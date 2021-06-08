import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClientConfig } from '@rxweb/http';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { translate } from '@rxweb/translate';
import { BrowserStorage } from './domain/services/browser-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isHome:boolean = true;

  constructor(private router: Router,private storageHelper:BrowserStorage){
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == "/login") {
          this.isHome = true;
        }
        else {
          this.isHome = false;
        }
      }
    });
  }


  title = 'HrManagementSystem';

  ngOnInit(){
    // HttpClientConfig.register({
    //   hostURIs: [{
    //       name: 'local',
    //       default: true,
    //       uri: 'http://localhost:3004' //Your server side url here
    //   }],
    //   filters: [],
    //   onError: (r) => { console.log(r) }        
    // })
    ReactiveFormConfig.set({"validationMessage":{"alpha":"Only alphabets are allowed."}});
    var auth = this.storageHelper.local.get("auth", false);
    if (auth) {
      this.router.navigate([location.pathname])
    }
    else {
      this.storageHelper.local.clearAll();
      this.router.navigate(["/login"])

    }

  }
}
