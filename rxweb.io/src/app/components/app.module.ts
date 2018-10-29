import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_LAZY_ROUTING } from './start/app.lazy.routing';
import { AppComponent } from './start/app.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { FooterComponent } from "src/app/components/shared/footer/footer.component";
import { HttpClientModule } from "@angular/common/http";
import { FilterPipe } from "src/app/pipes/filter.pipe";
import { ImportModulesComponent } from "src/app/components/import-modules/import.modules.component";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { ConfigureGlobalValidationMessagesComponent } from "src/app/components/configure-global-validation-messages/configure-global-validation-messages.component";
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { ApplicationBroadcaster } from "src/app/domain/application-broadcaster";
import { HomeComponent } from "src/app/components/home/home.component";




@NgModule({
  declarations: [
    AppComponent, SideBarComponent, TopBarComponent, DashboardComponent,FooterComponent,FilterPipe,ImportModulesComponent,ConfigureGlobalValidationMessagesComponent,HomeComponent
  ],
  imports: [BrowserModule, FormsModule,RxReactiveFormsModule, ReactiveFormsModule, HttpModule,HttpClientModule , RouterModule, APP_LAZY_ROUTING,RightSideBarSharedModule,DisqusSharedModule,
    HighlightModule.forRoot({ theme: 'default' }), ClipboardModule ,
    
  ],
  providers: [ApplicationBroadcaster],
exports:[RouterModule],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
