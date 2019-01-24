import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {RxHttp} from './';


@NgModule({
    imports: [HttpModule],
    providers: [{ provide: RxHttp, useClass: RxHttp } ],
})
export class RxHttpModule {

}