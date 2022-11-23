import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RxFormStategyModule, ErrorMessageBindingStrategy } from "@rxweb/form-strategy"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagingStrategyComponent } from './messaging-strategy/messaging-strategy.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConditionalMessagingComponent } from './conditional-error-messaging/conditional-error-messaging.component';

@NgModule({
    declarations: [
        AppComponent, MessagingStrategyComponent, ConditionalMessagingComponent
  ],
    imports: [ReactiveFormsModule, FormsModule,
        RxFormStategyModule.forRoot({
            //messageBindingStrategy: ErrorMessageBindingStrategy.
            // bindingStrategy: ErrorMessageBindingStrategy.OnSubmit,
            data: {
                required:'This Field is Required'
            },
            messagePath: "",
            language:"en"
        }),
    BrowserModule,
    AppRoutingModule
  ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
