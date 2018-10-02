import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { LESS_THAN_ROUTING } from './lessThan.routing';
import { LessThanComponent } from './lessThan.component';
import { LessThanExtendedModule } from '../../../../assets/examples/lessThan/lessThan.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    LESS_THAN_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, LessThanExtendedModule, ClipboardModule],
  declarations: [LessThanComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class LessThanModule { }

