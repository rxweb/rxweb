import { fakeAsync, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from "@angular/forms"


import { specTester } from "../spec-tester"
import { createInstance } from "../component-provider"
import { UrlValidationComponent } from './url-template-driven.component';

describe('template-driven forms integration tests', () => {



    describe('basic functionality', () => {

        it('should not error url with blank value', fakeAsync(() => {
            const fixture = createInstance(UrlValidationComponent);
            expect(specTester(fixture, { adminWebsiteUrl: '' }, 'url')).toBe(false);
            expect(specTester(fixture, { adminWebsiteUrl: undefined }, 'url')).toBe(false);
            expect(specTester(fixture, { adminWebsiteUrl: 'https://google.co.in' }, 'url')).toBe(false);
            expect(specTester(fixture, { adminWebsiteUrl: null }, 'url')).toBe(false);
            expect(specTester(fixture, { adminWebsiteUrl: 'https:/#/google.co.in' }, 'url')).toBe(true);
            expect(specTester(fixture, { adminWebsiteUrl: 'https://google.co.in',customerWebsiteUrl:'https://stackblitz.com'},'url')).toBe(false);
            expect(specTester(fixture, { adminWebsiteUrl: 'https://www.google.com',customerWebsiteUrl:'https:/@/stackblitz.com'},'url')).toBe(false);
            expect(specTester(fixture, { adminWebsiteUrl: 'https://google.co.in',customerWebsiteUrl:'https:/@/stackblitz.com'},'url')).toBe(true);
            expect(specTester(fixture, { maintenanceWebSiteUrl: 'https://github.com' }, 'url')).toBe(false);
            expect(specTester(fixture, { maintenanceWebSiteUrl: 'https:/@/github.com' }, 'url')).toBe(true);
        }));
        //end        
    })

})