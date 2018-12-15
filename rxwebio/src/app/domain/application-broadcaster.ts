import { Injectable} from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class ApplicationBroadcaster {
    private urlSubject: Subject<string> = new Subject<string>();

    public urlSubscriber: Observable<string>;

    constructor() {
        this.urlSubscriber = this.urlSubject.asObservable();
    }

    urlBroadCast(value: any): void {
        this.urlSubject.next(value);
    }

}
