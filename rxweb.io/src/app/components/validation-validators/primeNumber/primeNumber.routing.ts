import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimeNumberComponent } from './primeNumber.component';

const PRIME_NUMBER_ROUTES: Routes = [
{
  path: '', component: PrimeNumberComponent
}
];

export const PRIME_NUMBER_ROUTING: ModuleWithProviders = RouterModule.forChild(PRIME_NUMBER_ROUTES);
