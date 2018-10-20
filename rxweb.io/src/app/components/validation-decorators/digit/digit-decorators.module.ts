import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { DIGIT_ROUTING } from './digit.routing';
import { DigitComponent } from './digit.component';
import { DigitDecoratorsExtendedModule } from 'src/assets/examples/reactive-form-validators/decorators/digit/digit-decorators-extended.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@NgModule({
  imports: [
    DIGIT_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, DigitDecoratorsExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [DigitComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[MergeDashPipe]
})
export class DigitDecoratorsModule { }

