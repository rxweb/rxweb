import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

// For availing the services of translate we have to import `RxTranslateModule` and `TranslateModule`
import { RxTranslateModule } from '@rxweb/translate';
import { TranslateLoader, TranslateModule } from "@rxweb/ngx-translate-extension";



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttributeDirectiveComponent } from './attribute-directive/attribute-directive.component';
import { PipeComponent } from './pipe/pipe.component';
import { DecoratorComponent } from './decorator/decorator.component';
import { CountryService } from './service/country.service';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { ChangeLanguageComponent } from './change-language/change-language.component';
import { OtherIntuitiveFeatureComponent } from './other-intuitive-features/other-intuitive-features.component';
import { StructuralDirectiveComponent } from './structural-directive/structural-directive.component';
import { TranslateHttpLoader } from './service/translate-http-loader';



@NgModule({
    declarations: [
        AppComponent, AttributeDirectiveComponent, PipeComponent, DecoratorComponent, ValidationMessageComponent, ChangeLanguageComponent, OtherIntuitiveFeatureComponent, StructuralDirectiveComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule, ReactiveFormsModule,

        //One time configuration.
        TranslateModule.forRoot(
            {
                // Registering Custom Loader for translation request.
                loader: { provide: TranslateLoader, useClass: TranslateHttpLoader }
            }),

        RxTranslateModule.forRoot({
            preloadingStrategy: true, // Lazy load the translation content while resolving the module, refer the route of 'pre-load-module'.
            controlErrorMessage: { path: 'validationErrorMessages' }, // configure the validation message path for binding the validation messages according to the active language, refer this file `assets\i18n\en.json`
            forNgxTranslate: true, // work with ngx-translate-extension package
            cacheLanguageWiseObject: true, // the resolved content should be cached.
        }), 
    ],
    providers: [CountryService],
    bootstrap: [AppComponent]
})
export class AppModule { }


