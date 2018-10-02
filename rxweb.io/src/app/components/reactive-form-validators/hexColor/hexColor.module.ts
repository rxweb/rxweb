import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { HEX_COLOR_ROUTING } from './hexColor.routing';
import { HexColorComponent } from './hexColor.component';
import { HexColorExtendedModule } from '../../../../assets/examples/hexColor/hexColor.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    HEX_COLOR_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, HexColorExtendedModule, ClipboardModule],
  declarations: [HexColorComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HexColorModule { }

