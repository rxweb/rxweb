import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { PASSWORD_ROUTING } from './password.routing';
import { PasswordComponent } from './password.component';
import { PasswordExtendedModule } from '../../../../assets/examples/password/password.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    PASSWORD_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, PasswordExtendedModule, ClipboardModule],
  declarations: [PasswordComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PasswordModule { }

