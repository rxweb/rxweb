import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './password.component';

const PASSWORD_ROUTES: Routes = [
{
  path: '', component: PasswordComponent
}
];

export const PASSWORD_ROUTING: ModuleWithProviders = RouterModule.forChild(PASSWORD_ROUTES);
