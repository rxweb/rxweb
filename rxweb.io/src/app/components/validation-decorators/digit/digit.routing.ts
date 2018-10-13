import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DigitComponent } from './digit.component';

const DIGIT_ROUTES: Routes = [
{
  path: '', component: DigitComponent
}
];

export const DIGIT_ROUTING: ModuleWithProviders = RouterModule.forChild(DIGIT_ROUTES);
