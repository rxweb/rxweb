import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { LESS_THAN_EQUAL_TO_ROUTING } from './lessThanEqualTo.routing';
import { LessThanEqualToComponent } from './lessThanEqualTo.component';
import { LessThanEqualToExtendedModule } from '../../../../assets/examples/lessThanEqualTo/lessThanEqualTo.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    LESS_THAN_EQUAL_TO_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, LessThanEqualToExtendedModule, ClipboardModule],
  declarations: [LessThanEqualToComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class LessThanEqualToModule { }

