import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { LEAP_YEAR_ROUTING } from './leapYear.routing';
import { LeapYearComponent } from './leapYear.component';
import { LeapYearExtendedModule } from '../../../../assets/examples/reactive-form-validators/decorators/leapYear/leapYear.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    LEAP_YEAR_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, LeapYearExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [LeapYearComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[TitleCasePipe]
})
export class LeapYearModule { }

