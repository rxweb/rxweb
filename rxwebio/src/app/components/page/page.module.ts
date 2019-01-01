import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from "ngx-clipboard";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { CommonSharedModule } from "src/app/components/shared/common/common-shared.module";
import { PageComponent } from "src/app/components/page/page.component";
import { AppTabsComponent } from "src/app/components/shared/app-tabs/app-tabs.component";
import { PageViewerComponent } from "src/app/components/shared/page-viewer/page-viewer.component";
import { AppCodeComponent } from "src/app/components/shared/app-code/app-code.component";
import { AppExampleRunnerComponent } from "src/app/components/shared/app-example-runner/app-example-runner.component";
import { NgAisModule } from 'angular-instantsearch';


@NgModule({
  imports: [
    RouterModule,CommonModule, FormsModule, ReactiveFormsModule, ClipboardModule, RightSideBarSharedModule, ClipboardModule, HighlightModule, CommonSharedModule,NgAisModule
  ],
  declarations: [PageComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [PageViewerComponent, AppCodeComponent, AppExampleRunnerComponent, AppTabsComponent]
})
export class PageModule { }

