import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditCardComponent } from './creditCard.component';

const CREDIT_CARD_ROUTES: Routes = [
{
  path: '', component: CreditCardComponent
}
];

export const CREDIT_CARD_ROUTING: ModuleWithProviders = RouterModule.forChild(CREDIT_CARD_ROUTES);
