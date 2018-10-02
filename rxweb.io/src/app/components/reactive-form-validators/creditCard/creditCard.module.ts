import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { CREDIT_CARD_ROUTING } from './creditCard.routing';
import { CreditCardComponent } from './creditCard.component';
import { CreditCardExtendedModule } from '../../../../assets/examples/creditCard/creditCard.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";

@NgModule({
  imports: [
    CREDIT_CARD_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, CreditCardExtendedModule, ClipboardModule,DisqusSharedModule],
  declarations: [CreditCardComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CreditCardModule { }

