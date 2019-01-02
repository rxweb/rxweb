import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from "ngx-clipboard";
import { RightSideBarSharedModule } from '../shared/right-sidebar/right-sidebar-shared.module';
import { PageComponent } from './page.component';
import { PageViewerComponent } from '../shared/page-viewer/page-viewer.component';
import { AppCodeComponent } from '../shared/app-code/app-code.component';
import { AppExampleRunnerComponent } from '../shared/app-example-runner/app-example-runner.component';
import { AppTabsComponent } from '../shared/app-tabs/app-tabs.component';
import { CommonSharedModule } from '../shared/common/common-shared.module';


@NgModule({
  imports: [
    RouterModule,CommonModule, FormsModule, ReactiveFormsModule, ClipboardModule, RightSideBarSharedModule, ClipboardModule, HighlightModule, CommonSharedModule
  ],
  declarations: [PageComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [PageViewerComponent, AppCodeComponent, AppExampleRunnerComponent, AppTabsComponent]
})
export class PageModule { }

