import {NgModule, ModuleWithProviders} from '@angular/core';
import {HttpModule} from '@angular/http';

import {RxHttp} from './rxhttp.service';


@NgModule({
    imports: [HttpModule],
    providers: [{ provide: RxHttp, useClass: RxHttp } ],
})
export class RxHttpModule {

}
