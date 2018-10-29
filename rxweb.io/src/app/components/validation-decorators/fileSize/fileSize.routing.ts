import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileSizeComponent } from './fileSize.component';

const FILE_SIZE_ROUTES: Routes = [
{
  path: '', component: FileSizeComponent
}
];

export const FILE_SIZE_ROUTING: ModuleWithProviders = RouterModule.forChild(FILE_SIZE_ROUTES);
