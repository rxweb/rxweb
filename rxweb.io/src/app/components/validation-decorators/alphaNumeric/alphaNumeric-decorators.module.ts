import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { ALPHA_NUMERIC_ROUTING } from './alphaNumeric.routing';
import { AlphaNumericComponent } from './alphaNumeric.component';
import { AlphaNumericDecoratorsExtendedModule } from 'src/assets/examples/reactive-form-validators/decorators/alphaNumeric/alphaNumeric-decorators-extended.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@NgModule({
  imports: [
    ALPHA_NUMERIC_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, AlphaNumericDecoratorsExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [AlphaNumericComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[MergeDashPipe]
})
export class AlphaNumericDecoratorsModule { }

