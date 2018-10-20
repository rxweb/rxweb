import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { PASSWORD_ROUTING } from './password.routing';
import { PasswordComponent } from './password.component';
import { PasswordDecoratorsExtendedModule } from 'src/assets/examples/reactive-form-validators/decorators/password/password-decorators-extended.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@NgModule({
  imports: [
    PASSWORD_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, PasswordDecoratorsExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [PasswordComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[MergeDashPipe]
})
export class PasswordDecoratorsModule { }

