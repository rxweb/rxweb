import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { URL_ROUTING } from './url.routing';
import { UrlComponent } from './url.component';
import { UrlExtendedModule } from '../../../../assets/examples/url/url.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    URL_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, UrlExtendedModule, ClipboardModule],
  declarations: [UrlComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class UrlModule { }

