import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { GREATER_THAN_ROUTING } from './greaterThan.routing';
import { GreaterThanComponent } from './greaterThan.component';
import { GreaterThanExtendedModule } from '../../../../assets/examples/greaterThan/greaterThan.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    GREATER_THAN_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, GreaterThanExtendedModule, ClipboardModule],
  declarations: [GreaterThanComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class GreaterThanModule { }

