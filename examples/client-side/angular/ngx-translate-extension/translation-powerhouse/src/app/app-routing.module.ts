import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ChangeLanguageComponent } from './change-language/change-language.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'en/lazy-load' },
    { path: ':languageCode/lazy-load', component: ChangeLanguageComponent },
    {
        path: ':languageCode/pre-load-module', loadChildren: () => import(`./pre-load-module/pre-load-module.component`).then(m => m.PreLoadModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
