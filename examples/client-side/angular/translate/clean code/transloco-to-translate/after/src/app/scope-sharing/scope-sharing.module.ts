import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScopeSharingComponent } from './scope-sharing.component';
import { RouterModule, Routes } from '@angular/router';
import { RxTranslateModule } from "@rxweb/translate"
const routes: Routes = [
  {
    path: '',
    component: ScopeSharingComponent
  }
];

@NgModule({
  declarations: [ScopeSharingComponent],
  imports: [CommonModule, RouterModule.forChild(routes), RxTranslateModule]
})
export class ScopeSharingModule {}
