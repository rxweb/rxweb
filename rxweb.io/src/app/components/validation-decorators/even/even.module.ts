import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { EVEN_ROUTING } from './even.routing';
import { EvenComponent } from './even.component';
import { EvenExtendedModule } from '../../../../assets/examples/reactive-form-validators/decorators/even/even.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    EVEN_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, EvenExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [EvenComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[TitleCasePipe]
})
export class EvenModule { }

