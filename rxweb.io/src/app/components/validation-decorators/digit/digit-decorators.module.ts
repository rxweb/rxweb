import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { DIGIT_ROUTING } from './digit.routing';
import { DigitComponent } from './digit.component';
import { DigitExtendedModule } from 'src/assets/examples/reactive-form-validators/decorators/digit/digit.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    DIGIT_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, DigitExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [DigitComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[TitleCasePipe]
})
export class DigitDecoratorsModule { }

