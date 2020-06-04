import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranspilersComponent } from './transpilers.component';
import { RouterModule, Routes } from '@angular/router';
import { RxTranslateModule } from '@rxweb/translate';

const routes: Routes = [
  {
    path: '',
    component: TranspilersComponent
  }
];

@NgModule({
    declarations: [TranspilersComponent],
    imports: [CommonModule, RouterModule.forChild(routes), RxTranslateModule],
})
export class TranspilersModule {}
