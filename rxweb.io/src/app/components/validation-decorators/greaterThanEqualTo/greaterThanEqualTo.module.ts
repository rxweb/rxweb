import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { GREATER_THAN_EQUAL_TO_ROUTING } from './greaterThanEqualTo.routing';
import { GreaterThanEqualToComponent } from './greaterThanEqualTo.component';
import { GreaterThanEqualToExtendedModule } from '../../../../assets/examples/reactive-form-validators/decorators/greaterThanEqualTo/greaterThanEqualTo.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    GREATER_THAN_EQUAL_TO_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, GreaterThanEqualToExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [GreaterThanEqualToComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[TitleCasePipe]
})
export class GreaterThanEqualToModule { }

