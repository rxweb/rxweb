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
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormConfigComponent } from './reactive-form-config/reactive-form-config.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { PromptUpdateService } from '../services/prompt-update.service';
import { LogUpdateService } from '../services/log-update.service';
import { CheckForUpdateService } from '../services/check-for-update.service';
import { FooterSharedModule } from './shared/footer/footer-shared.module';
import { AuthService } from '../domain/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FilterPipe } from '../pipes/filter.pipe';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { ControlModule } from '../controls/control.module';
import { DisqusSharedModule } from './shared/disqus/disqus-shared.module';
import { RightSideBarSharedModule } from './shared/right-sidebar/right-sidebar-shared.module';
import { HomeComponent } from './home/home.component';
import { ApplicationBroadcaster } from '../domain/application-broadcaster';
import { BasicExamplesExtendedModule } from 'src/assets/examples/reactive-form-validators/basic-examples/basic-examples-extended.module';
import { NgAisModule } from 'angular-instantsearch';


@NgModule({
  declarations: [
    AppComponent, SideBarComponent, TopBarComponent, DashboardComponent,FilterPipe,GettingStartedComponent,ReactiveFormConfigComponent,HomeComponent
  ],
  imports: [BrowserModule, FormsModule,RxReactiveFormsModule, ReactiveFormsModule, HttpModule,HttpClientModule , RouterModule, APP_LAZY_ROUTING,RightSideBarSharedModule,DisqusSharedModule,BasicExamplesExtendedModule,ControlModule,FooterSharedModule,
    HighlightModule.forRoot({ theme: 'default' }), ClipboardModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),NgAisModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [ApplicationBroadcaster,PromptUpdateService,LogUpdateService,CheckForUpdateService,AuthService],
exports:[RouterModule],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
