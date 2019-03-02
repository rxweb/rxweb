import {NgModule, ModuleWithProviders} from '@angular/core';

import {Local, Session, RxStorage} from './storage';

@NgModule({
    providers: [RxStorage]
})
export class RxStorageModule {
}