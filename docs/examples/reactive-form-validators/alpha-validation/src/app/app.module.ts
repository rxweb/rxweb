import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router"
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AlphaComponent } from './alpha/alpha.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ClientDataComponent } from "./basic-validation/client-data/client-data.component";
import { RemoteDataComponent } from "./basic-validation/remote-data/remote-data.component";


@NgModule({
  declarations: [
      AppComponent, AlphaComponent, ClientDataComponent, RemoteDataComponent
  ],
  imports: [
      BrowserModule, HttpClientModule, ReactiveFormsModule, FormsModule,

      RouterModule.forRoot([
          {
              path: 'client-data', component: ClientDataComponent,
          },
          {
              path: 'remote-data', component: RemoteDataComponent,
          },
          {
              path: 'complete-example', component: AlphaComponent,
          },
      ])
  ],
  providers: [RxFormBuilder],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule { }
