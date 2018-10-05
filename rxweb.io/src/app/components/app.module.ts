import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { FooterComponent } from "src/app/components/shared/footer/footer.component";
import { HttpClientModule } from "@angular/common/http";




@NgModule({
  declarations: [
    AppComponent, SideBarComponent, TopBarComponent, DashboardComponent,FooterComponent
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule,HttpClientModule , RouterModule, APP_LAZY_ROUTING,
    HighlightModule.forRoot({ theme: 'default' }), ClipboardModule ,
    NgSlimScrollModule,
    
  ],
  providers: [{
    provide: SLIMSCROLL_DEFAULTS,
    useValue: {
      position: "right",
      barBackground: "none",
      barOpacity: "0.8",
      barWidth: "0",
      barBorderRadius: "20",
      barMargin: "0",
      gridBackground: "none",
      gridOpacity: "1",
      gridWidth: "2",
      gridBorderRadius: "20",
      gridMargin: "0",
      alwaysVisible: true,
      visibleTimeout: 1000,
    }
  },],
exports:[RouterModule],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
