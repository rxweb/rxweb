import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { REQUIRED_ROUTING } from './required.routing';
import { RequiredComponent } from './required.component';
import { RequiredExtendedModule } from 'src/assets/examples/reactive-form-validators/validators/required/required.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    REQUIRED_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, RequiredExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [RequiredComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[TitleCasePipe]
})
export class RequiredValidatorsModule { }

