import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortComponent } from './port.component';

const PORT_ROUTES: Routes = [
{
  path: '', component: PortComponent
}
];

export const PORT_ROUTING: ModuleWithProviders = RouterModule.forChild(PORT_ROUTES);
