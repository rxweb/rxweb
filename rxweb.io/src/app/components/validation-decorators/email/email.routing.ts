import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailComponent } from './email.component';

const EMAIL_ROUTES: Routes = [
{
  path: '', component: EmailComponent
}
];

export const EMAIL_ROUTING: ModuleWithProviders = RouterModule.forChild(EMAIL_ROUTES);
