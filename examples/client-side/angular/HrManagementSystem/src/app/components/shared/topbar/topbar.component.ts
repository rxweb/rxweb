import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RxTranslation } from "@rxweb/translate";
import { BrowserStorage } from "src/app/domain/services/browser-storage";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
    selectedLanguage:string = 'EN';
    constructor(private router: Router, private browserStorage: BrowserStorage, private rxTranslation: RxTranslation,) { }
    ngOnInit() {

    }
    logout() {
        window.setTimeout(() => {
            this.router.navigate(["/login"])
            this.browserStorage.local.clearAll();
        }, 1000);
    }
    changeLanguage(languageCode: any) {
        this.selectedLanguage = languageCode.toUpperCase();
        this.rxTranslation.change(languageCode);
    }
}