import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
    Router,
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';

import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

import { Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';



@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    loading: boolean = true;
    start: number = 0;
    constructor(private router: Router,
        private title: Title,
        @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {
        // spinner/loader subscription
        router.events
            .subscribe((event: RouterEvent) => {
                this.navigationInterceptor(event);
            });
        // page title subscription
        // https://toddmotto.com/dynamic-page-titles-angular-2-router-events#final-code
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.router.routerState.root),
                map(route => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data)
            )
            .subscribe((event) => this.updatePageTitle(event['title']));
    }

    ngOnInit() {
        console.log('Default test: ' + this.i18NextService.t('not_exists', 'default'));
        console.log('Initial App State', 0);
        this.i18NextService.events.languageChanged.subscribe(lang => {
            let root = this.router.routerState.root;
            if (root != null && root.firstChild != null) {
                let data: any = root.firstChild.data;
                this.updatePageTitle(data && data.value && data.value.title);
            }
        });
    }

    // http://stackoverflow.com/questions/37069609/show-loading-screen-when-navigating-between-routes-in-angular-2
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            // this.start = performance.now();
            this.loading = true;
        }
        if (event instanceof NavigationEnd
            || event instanceof NavigationCancel
            || event instanceof NavigationError) {
            this.loading = false;
            // console.log(performance.now() - this.start);
        }
    }

    updatePageTitle(title: string): void {
        let newTitle = title || 'application_title';
        console.log('Setting page title:', newTitle);
        this.title.setTitle(newTitle);
        console.log('Setting page title end:', newTitle);
    }
}
