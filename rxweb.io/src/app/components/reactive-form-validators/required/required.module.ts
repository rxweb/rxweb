import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { REQUIRED_ROUTING } from './required.routing';
import { RequiredComponent } from './required.component';
import { RequiredExtendedModule } from '../../../../assets/examples/required/required.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";

@NgModule({
  imports: [
    REQUIRED_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, RequiredExtendedModule, ClipboardModule,DisqusSharedModule],
  declarations: [RequiredComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class RequiredModule { }

