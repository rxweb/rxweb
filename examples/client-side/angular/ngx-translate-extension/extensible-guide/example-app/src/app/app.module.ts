import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@rxweb/ngx-translate-extension';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
      TranslateModule.forRoot({
          globalFilePath: `assets/i18n/{{language-code}}.json`
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
