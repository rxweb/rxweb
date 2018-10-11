import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { ALPHA_NUMERIC_ROUTING } from './alphaNumeric.routing';
import { AlphaNumericComponent } from './alphaNumeric.component';
import { AlphaNumericExtendedModule } from 'src/assets/examples/reactive-form-validators/validators/alphaNumeric/alphaNumeric.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    ALPHA_NUMERIC_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, AlphaNumericExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [AlphaNumericComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[TitleCasePipe]
})
export class AlphaNumericValidatorsModule { }

