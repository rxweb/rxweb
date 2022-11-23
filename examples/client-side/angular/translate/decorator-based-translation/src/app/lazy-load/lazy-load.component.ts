import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { translate, RxTranslation, asyncTranslate } from '@rxweb/translate';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { USERS } from '../const/data';
import { CountryService } from '../countries.service';
@Component({
    templateUrl: './lazy-load.component.html',
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyLoadComponent implements OnInit {
    @translate({ translationName: 'fixed-language', language: 'en' }) fixedLanguage: any;
    @translate({ translationName: 'lazy-load' }) lazyLoadContent: {[key:string]:any};
    activeLanguage: string;
    formGroup: FormGroup;
    constructor(private rxTranslation: RxTranslation, private router: Router, private activatedRoute: ActivatedRoute,private formBuilder:FormBuilder) {
        activatedRoute.params.subscribe(t => {
            this.activeLanguage = t["languageCode"];
        })
    }

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            fullName: ['', Validators.required],
            designation: ['Software', Validators.maxLength(5)]
        })
    }

    changeLanguage(languageCode: string) {
        this.rxTranslation.change(languageCode);
    }

    @translate() global: any;
    @asyncTranslate({
        serviceModel: CountryService,
        serviceMethod: CountryService.prototype.get
    })
    countries: any;
    name: string = "John";
    meridiem: string = "am";
    users: any[] = USERS;
    keys: string[] = ["keyOne", "nested.keyOne"];

    changeName() {
        this.name = this.name == "John" ? "Mike" : "John";
    }

    changeMeridiem() {
        this.meridiem = this.meridiem == "am" ? "pm" : "am";
    }

    message: string;

    mouseout(e) {
        console.log(e)
    }


    selectUser(user) {
        this.message = this.rxTranslation.translate(
            this.global.selectedRecord, user
        );
    }

    navigate(languageCode: string) {
        this.router.navigate([languageCode, "lazy-load"])
    }

    get badgeClass() {
        return this.global && this.global.languageCode && this.global.languageCode == "en" ? "badge-warning" : "badge-success";
    }
}
