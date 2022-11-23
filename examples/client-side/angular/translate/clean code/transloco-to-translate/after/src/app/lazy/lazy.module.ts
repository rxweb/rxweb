import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './lazy.component';
import { RouterModule, Routes } from '@angular/router';
import { RxTranslateModule } from "@rxweb/translate"

const routes: Routes = [
  {
    path: '',
    component: LazyComponent
  }
];

@NgModule({
  declarations: [LazyComponent],
    imports: [CommonModule, RouterModule.forChild(routes), RxTranslateModule]
})
export class LazyModule {
}
