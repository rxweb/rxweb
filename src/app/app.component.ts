import { Component, OnInit, OnDestroy } from '@angular/core';
import { translate,RxTranslateModule } from '@rxweb/translate'

@Component({
    selector: 'app-contact-child',
    template: '<h1>ajay {{content | json}}</h1>',

})
export class ContactListChildComponent implements OnInit {

    @translate({ name: "contact-child" }) content: any;
    constructor() { }
    ngOnInit() {

    }
}
@Component({
    template: '<h1>contact{{content | json}}</h1>',

})
export class ContactComponent implements OnInit {

    @translate({ name: "test" }) content: any;
    constructor() { }
    ngOnInit() {

    }
}

@Component({
    selector:'app-contact',
    template:'<h1>ajay {{content | json}}</h1><router-outlet></router-outlet>',
   
})
export class ContactListComponent implements OnInit {

    @translate({ name: "contact" }) content: any;
    constructor() { }
    ngOnInit() {

    }
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @translate() global: any;
    isHide: boolean;
    constructor() { }
    ngOnInit() {
    }

    hideClick() {
        this.isHide = !this.isHide;
    }
    language: string = "en";
    changeLanguage() {
        this.language = this.language == "en" ? "fr" : "en";
        RxTranslateModule.changeLanguage(this.language)        
    }
}


