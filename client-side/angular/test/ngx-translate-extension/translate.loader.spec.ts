import { TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { TranslateLoader, TranslateModule, TranslateService } from '@rxweb/ngx-translate-extension'
import { RxTranslateModule } from '@rxweb/translate';
let translations: any = { "TEST": "This is a test" };

class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return of(translations);
    }
}

describe('TranslateLoader', () => {
    let translate: TranslateService;

    it('should be able to provide TranslateStaticLoader', () => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader }
                })
                , RxTranslateModule.forRoot({
                    isTest: true,
                    forNgxTranslate: true,
                    cacheLanguageWiseObject: true,
                })
            ],
        });
        translate = TestBed.get(TranslateService);

        expect(translate).toBeDefined();
        expect(translate.customLoader).toBeDefined();
        
        expect(translate.customLoader instanceof FakeLoader).toBeTruthy();

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');

        // this will request the translation from the backend because we use a static files loader for TranslateService
        translate.get('TEST').subscribe((res: string) => {
            expect(res).toEqual('This is a test');
        });
    });

    it('should be able to provide any TranslateLoader', () => {
        class CustomLoader implements TranslateLoader {
            getTranslation(lang: string): Observable<any> {
                return of({ "TEST": "This is also a test" });
            }
        }

        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: CustomLoader }
                })
                , RxTranslateModule.forRoot({
                    isTest: true,
                    forNgxTranslate: true,
                    cacheLanguageWiseObject: true,
                })
            ]
        });
        translate = TestBed.get(TranslateService);

        expect(translate).toBeDefined();
        expect(translate.customLoader).toBeDefined();
        expect(translate.customLoader instanceof CustomLoader).toBeTruthy();

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');

        // this will request the translation from the CustomLoader
        translate.get('TEST').subscribe((res: string) => {
            expect(res).toEqual('This is also a test');
        });
    });

});
