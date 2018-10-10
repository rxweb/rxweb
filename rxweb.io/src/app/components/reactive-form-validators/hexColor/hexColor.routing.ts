import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HexColorComponent } from './hexColor.component';

const HEX_COLOR_ROUTES: Routes = [
{
  path: '', component: HexColorComponent
}
];

export const HEX_COLOR_ROUTING: ModuleWithProviders = RouterModule.forChild(HEX_COLOR_ROUTES);
