import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScopeSharingComponent } from './scope-sharing.component';
import { RouterModule, Routes } from '@angular/router';
import { TRANSLOCO_LOADING_TEMPLATE, TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';

const routes: Routes = [
  {
    path: '',
    component: ScopeSharingComponent
  }
];

@NgModule({
  declarations: [ScopeSharingComponent],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'todos-page',
        alias: 'todos'
      }
    },
    {
      provide: TRANSLOCO_LOADING_TEMPLATE,
      useValue: `<span id="default-loading-template">Loading template...</span>`
    }
  ],
  imports: [CommonModule, RouterModule.forChild(routes), TranslocoModule]
})
export class ScopeSharingModule {}
