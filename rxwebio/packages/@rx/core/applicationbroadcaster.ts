import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class ApplicationBroadcaster {
  
  private configurationSubject: Subject<boolean> = new Subject<boolean>();

  public configurationSubscriber: Observable<boolean>;

  private urlSubject: Subject<string> = new Subject<string>();

  public urlSubscriber: Observable<string>;

  
  constructor() {
    this.configurationSubscriber = this.configurationSubject.asObservable();
    this.urlSubscriber = this.urlSubject.asObservable();
  }

  configurationBroadCast(value: boolean): void {
    this.configurationSubject.next(value);
  }

  urlBroadCast(value: any): void {
      this.urlSubject.next(value);
  }

}
