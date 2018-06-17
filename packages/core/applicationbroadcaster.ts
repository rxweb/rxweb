import { Injectable} from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class ApplicationBroadcaster {
    private loginSubject: Subject<boolean> = new Subject<boolean>();

    public loginSubscriber: Observable<boolean>;

    private allTypeSubject: Subject<boolean> = new Subject<any>();

    public allTypeSubscriber: Observable<any>;

    private configurationSubject: Subject<boolean> = new Subject<boolean>();

    public configurationSubscriber: Observable<boolean>;

    constructor() {
        this.loginSubscriber = this.loginSubject.asObservable();
        this.configurationSubscriber = this.configurationSubject.asObservable();
        this.allTypeSubscriber = this.allTypeSubject.asObservable();
    }

    loginBroadCast(value: boolean): void {
        this.loginSubject.next(value);
    }

    allTypeBroadCast(value: any): void {
        this.allTypeSubject.next(value);
    }

    configurationBroadCast(value: boolean): void {
        this.configurationSubject.next(value);
    }
}
