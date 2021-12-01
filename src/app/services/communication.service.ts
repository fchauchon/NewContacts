import { Injectable } from '@angular/core';
import { Person } from '../classes/person';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

    protected messageQueue = new Subject<string>();
    protected errorQueue = new Subject<string>();
    protected refreshQueue = new BehaviorSubject<boolean>(true);

    constructor() { }
  
    pushMessage(message: string) {
        this.messageQueue.next(message);
    }

    onMessage(): Observable<string> {
        return this.messageQueue.asObservable();
    }

    pushError(error: string) {
        this.errorQueue.next(error);
    }

    onError(): Observable<string> {
        return this.errorQueue.asObservable();
    }

    pushRefresh(refresh: boolean) {
        this.refreshQueue.next(refresh);
    }

    onRefresh(): Observable<boolean> {
        return this.refreshQueue.asObservable();
    }

}
