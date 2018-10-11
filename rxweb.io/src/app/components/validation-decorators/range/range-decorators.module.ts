import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { RANGE_ROUTING } from './range.routing';
import { RangeComponent } from './range.component';
import { RangeExtendedModule } from 'src/assets/examples/reactive-form-validators/decorators/range/range.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    RANGE_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, RangeExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [RangeComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[TitleCasePipe]
})
export class RangeDecoratorsModule { }

