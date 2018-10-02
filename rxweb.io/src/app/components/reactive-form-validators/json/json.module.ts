import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { JSON_ROUTING } from './json.routing';
import { JsonComponent } from './json.component';
import { JsonExtendedModule } from '../../../../assets/examples/json/json.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    JSON_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, JsonExtendedModule, ClipboardModule],
  declarations: [JsonComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class JsonModule { }

