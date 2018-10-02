import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { GREATER_THAN_EQUAL_TO_ROUTING } from './greaterThanEqualTo.routing';
import { GreaterThanEqualToComponent } from './greaterThanEqualTo.component';
import { GreaterThanEqualToExtendedModule } from '../../../../assets/examples/greaterThanEqualTo/greaterThanEqualTo.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    GREATER_THAN_EQUAL_TO_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, GreaterThanEqualToExtendedModule, ClipboardModule],
  declarations: [GreaterThanEqualToComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class GreaterThanEqualToModule { }

