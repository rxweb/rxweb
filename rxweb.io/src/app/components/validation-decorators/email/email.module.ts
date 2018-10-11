import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { EMAIL_ROUTING } from './email.routing';
import { EmailComponent } from './email.component';
import { EmailExtendedModule } from '../../../../assets/examples/reactive-form-validators/decorators/email/email.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    EMAIL_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, EmailExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [EmailComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[TitleCasePipe]
})
export class EmailModule { }

